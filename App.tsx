import React, { useState, useEffect, useCallback } from 'react';
import { Todo, FilterStatus, User, AuthDetails, SignupAuthDetails, Role } from './types';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { FilterControls } from './components/FilterControls';
import { AuthForm } from './components/AuthForm';
import { AdminPanel } from './components/AdminPanel';
import { TeacherHomeScreen } from './components/TeacherHomeScreen';
import { StudentHomeScreen } from './components/StudentHomeScreen'; // Import StudentHomeScreen

const USERS_STORAGE_KEY = 'todosApp.users';
const TODOS_STORAGE_KEY_PREFIX = 'todosApp.todos.';
const CURRENT_USER_STORAGE_KEY = 'todosApp.currentUser';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.ALL);
  
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null);
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [adminViewingUser, setAdminViewingUser] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const [showIntroScreen, setShowIntroScreen] = useState<boolean>(true);
  const [introStep, setIntroStep] = useState<number>(0); 

  const getStoredUsers = useCallback((): { [username: string]: User } => {
    try {
      const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
      return usersJson ? JSON.parse(usersJson) : {};
    } catch (error) {
      console.error("Error parsing users from localStorage:", error);
      return {};
    }
  }, []);

  const saveStoredUsers = useCallback((updatedUsers: { [username: string]: User }) => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    } catch (error) {
      console.error("Failed to save users to localStorage:", error);
      setAuthError("Failed to save user data. LocalStorage might be full or disabled.");
    }
  }, [setAuthError]);

  const loadTodosForUser = useCallback((username: string) => {
    try {
      const storedTodos = localStorage.getItem(`${TODOS_STORAGE_KEY_PREFIX}${username}`);
      setTodos(storedTodos ? JSON.parse(storedTodos) : []);
    } catch (error) {
      console.error(`Failed to load todos for ${username}:`, error);
      setTodos([]);
    }
  }, []);

  const saveTodosForUser = useCallback((username: string, newTodos: Todo[]) => {
    try {
      localStorage.setItem(`${TODOS_STORAGE_KEY_PREFIX}${username}`, JSON.stringify(newTodos));
    } catch (error) {
      console.error(`Failed to save todos for ${username}:`, error);
    }
  }, []);

  useEffect(() => {
    const storedUsersData = getStoredUsers();
    const storedUsername = localStorage.getItem(CURRENT_USER_STORAGE_KEY);

    if (storedUsername) {
      const userData = storedUsersData[storedUsername];
      if (userData) {
        setCurrentUser(storedUsername);
        setIsCurrentUserAdmin(userData.isAdmin || false);
        setCurrentUserRole(userData.role || Role.STUDENT); // Default to student if role not set
        if (userData.isAdmin) {
          setAllUsers(Object.values(storedUsersData).sort((a,b) => a.username.localeCompare(b.username)));
        }
      } else {
        // User data not found for stored username, clear session
        localStorage.removeItem(CURRENT_USER_STORAGE_KEY); 
      }
    }
  }, [getStoredUsers]);

 useEffect(() => {
    if (showIntroScreen) {
      const timers: number[] = [];
      timers.push(window.setTimeout(() => setIntroStep(1), 200));      
      timers.push(window.setTimeout(() => setIntroStep(3), 2500));     
      timers.push(window.setTimeout(() => setShowIntroScreen(false), 3000)); 
      return () => timers.forEach(clearTimeout);
    }
  }, [showIntroScreen]);

  useEffect(() => {
    const userToLoad = adminViewingUser || currentUser;
    if (userToLoad) {
      loadTodosForUser(userToLoad);
    } else {
      setTodos([]); 
    }
  }, [currentUser, adminViewingUser, loadTodosForUser]);

  const handleLogin = (details: AuthDetails) => {
    setAuthError(null);
    const users = getStoredUsers();
    const user = users[details.username];

    if (user) {
      if (user.password === details.password) {
        setCurrentUser(user.username);
        setIsCurrentUserAdmin(user.isAdmin);
        setCurrentUserRole(user.role);
        localStorage.setItem(CURRENT_USER_STORAGE_KEY, user.username);
        if (user.isAdmin) {
          setAllUsers(Object.values(users).sort((a, b) => a.username.localeCompare(b.username)));
        }
        setAdminViewingUser(null); // Reset admin view on login
      } else {
        setAuthError('Incorrect password. Please try again.');
      }
    } else {
      setAuthError('Username not found. Please check your username or sign up.');
    }
  };

  const handleSignup = (details: SignupAuthDetails) => {
    setAuthError(null);
    const users = getStoredUsers();
    if (users[details.username]) {
      setAuthError('Username already exists.');
      return;
    }
    const isFirstUser = Object.keys(users).length === 0;
    const newUser: User = {
      username: details.username,
      password: details.password, 
      isAdmin: isFirstUser,
      role: details.role,
    };
    const updatedUsers = { ...users, [details.username]: newUser };
    saveStoredUsers(updatedUsers);
    
    // Check if saveStoredUsers set an error
    if (localStorage.getItem(USERS_STORAGE_KEY) !== JSON.stringify(updatedUsers)) {
        // Error was set by saveStoredUsers, or saving failed silently (less likely with try-catch)
        // We might not want to proceed with login if saving failed.
        // For now, we proceed optimistically as before.
    }

    setCurrentUser(newUser.username);
    setIsCurrentUserAdmin(newUser.isAdmin);
    setCurrentUserRole(newUser.role);
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, newUser.username);
    
    if (newUser.isAdmin) { 
        setAllUsers(Object.values(updatedUsers).sort((a,b) => a.username.localeCompare(b.username)));
    }
    setAdminViewingUser(null); // Reset admin view on signup
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsCurrentUserAdmin(false);
    setCurrentUserRole(null);
    setAdminViewingUser(null);
    setAllUsers([]);
    setTodos([]);
    setAuthError(null);
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  };
  
  const activeUserForTodos = adminViewingUser || currentUser;

  const addTodo = (text: string) => {
    if (!activeUserForTodos) return;
    const newTodo: Todo = { id: Date.now().toString(), text, completed: false, createdAt: Date.now() };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodosForUser(activeUserForTodos, updatedTodos);
  };

  const toggleTodo = (id: string) => {
    if (!activeUserForTodos) return;
    const updatedTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    setTodos(updatedTodos);
    saveTodosForUser(activeUserForTodos, updatedTodos);
  };

  const deleteTodo = (id: string) => {
    if (!activeUserForTodos) return;
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveTodosForUser(activeUserForTodos, updatedTodos);
  };

  const editTodo = (id: string, newText: string) => {
    if (!activeUserForTodos) return;
    const updatedTodos = todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo);
    setTodos(updatedTodos);
    saveTodosForUser(activeUserForTodos, updatedTodos);
  };

  const clearCompleted = () => {
    if (!activeUserForTodos) return;
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
    saveTodosForUser(activeUserForTodos, updatedTodos);
  };

  const handleSelectUserToViewByAdmin = (username: string) => {
    setAdminViewingUser(username);
    // Todos will be loaded by the useEffect watching adminViewingUser
  };

  const handleViewOwnTodosByAdmin = () => {
    setAdminViewingUser(null);
    // Todos will be loaded by the useEffect watching adminViewingUser (becomes currentUser)
  };

  const handleDeleteUserByAdmin = (usernameToDelete: string) => {
    if (!currentUser || !isCurrentUserAdmin) return;
    let users = getStoredUsers(); 
    const userToDeleteData = users[usernameToDelete];
    if (!userToDeleteData) return;

    const adminUsers = Object.values(users).filter(u => u.isAdmin);
    if (userToDeleteData.isAdmin && userToDeleteData.username === currentUser && adminUsers.length <= 1) {
      setAuthError("Cannot delete the only admin account."); // This error should be displayed in AdminPanel or globally
      return;
    }
    
    const { [usernameToDelete]: _, ...remainingUsers } = users; 
    users = remainingUsers; 
    saveStoredUsers(users);
    localStorage.removeItem(`${TODOS_STORAGE_KEY_PREFIX}${usernameToDelete}`);

    if (adminViewingUser === usernameToDelete) setAdminViewingUser(null); // Go back to viewing own tasks
    
    // If deleting self
    if (currentUser === usernameToDelete) {
      handleLogout(); 
      return; 
    }
    
    // Update allUsers list for AdminPanel
    setAllUsers(Object.values(users).sort((a,b) => a.username.localeCompare(b.username)));
  };
  
  const filteredTodos = todos.filter(todo => {
    if (filter === FilterStatus.ACTIVE) return !todo.completed;
    if (filter === FilterStatus.COMPLETED) return todo.completed;
    return true;
  }).sort((a,b) => a.createdAt - b.createdAt);

  // Common props for home screens
  const commonHomeProps = {
    currentUser: currentUser!, // currentUser is guaranteed to be non-null at this point
    currentUserRole: currentUserRole!,
    handleLogout: handleLogout,
  };
  const todoManagerProps = {
    todos: todos,
    filteredTodos: filteredTodos,
    filter: filter,
    setFilter: setFilter,
    addTodo: addTodo,
    toggleTodo: toggleTodo,
    deleteTodo: deleteTodo,
    editTodo: editTodo,
    clearCompleted: clearCompleted,
  };


  if (showIntroScreen) {
    return (
      <div className={`fixed inset-0 flex flex-col items-center justify-center bg-slate-50 transition-opacity duration-500 ease-in-out ${introStep === 3 ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-center p-4">
              <h1 className={`text-5xl sm:text-6xl font-bold text-sky-600 transition-all duration-1000 ease-out
                              ${introStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  Sarvoday NEET Academy
              </h1>
              <div className={`mt-10 transition-opacity duration-500 ease-out ${introStep === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="text-sm text-slate-400">Loading...</p>
              </div>
          </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-slate-100">
        <AuthForm
          onLogin={handleLogin}
          onSignup={handleSignup}
          error={authError}
          clearError={() => setAuthError(null)}
        />
      </div>
    );
  }

  // Admin is actively viewing another user's tasks
  if (isCurrentUserAdmin && adminViewingUser && adminViewingUser !== currentUser) {
    const tasksHeader = `Viewing tasks for: ${adminViewingUser}`;
    return (
      <div className={`max-w-4xl w-full mx-auto my-8 p-6 sm:p-8 bg-white rounded-xl shadow-2xl flex flex-col`}>
        <header className="flex-shrink-0 flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-slate-200">
        <div className="text-center sm:text-left mb-3 sm:mb-0">
            <h1 className={`text-3xl font-bold text-sky-600`}>Admin Task View</h1>
            <p className={`text-sm text-slate-600`}>
                Welcome, {currentUser}! ({currentUserRole}) [Admin]
            </p>
        </div>
        <div className="flex-shrink-0 flex items-center space-x-3">
          <button
            onClick={handleLogout}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300
                        bg-red-600 hover:bg-red-700 text-white
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:ring-offset-white`}
            aria-label="Logout"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>Logout
          </button>
        </div>
      </header>
        <div className="flex-shrink-0">
          <AdminPanel
            users={allUsers}
            currentUserUsername={currentUser} 
            adminViewingUsername={adminViewingUser}
            onSelectUserToView={handleSelectUserToViewByAdmin}
            onViewOwnTodos={handleViewOwnTodosByAdmin}
            onDeleteUser={handleDeleteUserByAdmin}
          />
        </div>
        <h2 className={`flex-shrink-0 text-xl font-semibold mb-4 text-slate-700`}>{tasksHeader}</h2>
        <div className="flex-shrink-0"><AddTodoForm onAddTodo={addTodo} /></div>
        {todos.length > 0 && <div className="flex-shrink-0"><FilterControls currentFilter={filter} onFilterChange={setFilter} /></div>}
        <div className="flex-grow overflow-y-auto mb-4 min-h-[200px]">
          {filteredTodos.length > 0 ? (
            <TodoList todos={filteredTodos} onToggleTodo={toggleTodo} onDeleteTodo={deleteTodo} onEditTodo={editTodo} />
          ) : (
            <p className={`text-center py-4 text-slate-500`}>{todos.length === 0 ? `${activeUserForTodos} has no tasks.` : "No tasks match filter."}</p>
          )}
        </div>
        {todos.length > 0 && filteredTodos.length > 0 && todos.some(todo => todo.completed) && (
          <div className="flex-shrink-0 text-center pt-2"> 
            <button onClick={clearCompleted} className={`px-4 py-2 text-sm rounded-md transition-colors text-slate-500 hover:text-red-600 hover:bg-slate-200 focus:outline-none focus:ring-1 focus:ring-red-500`}>
                Clear Completed ({todos.filter(todo => todo.completed).length})
            </button>
          </div>
        )}
      </div>
    );
  }
  
  // User is viewing their own dashboard/tasks
  if (currentUserRole === Role.TEACHER) {
    return <TeacherHomeScreen {...commonHomeProps} {...todoManagerProps} />;
  }

  if (currentUserRole === Role.STUDENT) {
    return <StudentHomeScreen {...commonHomeProps} {...todoManagerProps} />;
  }

  // Fallback: Generic To-Do List (e.g., Admin viewing their own tasks, or user with no specific role)
  const tasksHeader = isCurrentUserAdmin ? "Your Admin Tasks" : "Your Tasks";
  return (
    <div className={`max-w-4xl w-full mx-auto my-8 p-6 sm:p-8 bg-white rounded-xl shadow-2xl flex flex-col`}>
      <header className="flex-shrink-0 flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-slate-200">
        <div className="text-center sm:text-left mb-3 sm:mb-0">
            <h1 className={`text-3xl font-bold text-sky-600`}>To-Do List</h1>
            <p className={`text-sm text-slate-600`}>
                Welcome, {currentUser}! {currentUserRole ? `(${currentUserRole})` : ''} {isCurrentUserAdmin ? "[Admin]" : ""}
            </p>
        </div>
        <div className="flex-shrink-0 flex items-center space-x-3">
          <button
            onClick={handleLogout}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300
                        bg-red-600 hover:bg-red-700 text-white
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:ring-offset-white`}
            aria-label="Logout"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>Logout
          </button>
        </div>
      </header>

      {isCurrentUserAdmin && ( // Show AdminPanel if the current user is an admin (and not viewing someone else, handled above)
        <div className="flex-shrink-0">
          <AdminPanel
            users={allUsers}
            currentUserUsername={currentUser} 
            adminViewingUsername={adminViewingUser} // Will be null or self if admin is viewing own tasks
            onSelectUserToView={handleSelectUserToViewByAdmin}
            onViewOwnTodos={handleViewOwnTodosByAdmin}
            onDeleteUser={handleDeleteUserByAdmin}
          />
        </div>
      )}
      
      <h2 className={`flex-shrink-0 text-xl font-semibold mb-4 text-slate-700`}>
        {tasksHeader}
      </h2>

      <div className="flex-shrink-0">
        <AddTodoForm onAddTodo={addTodo} />
      </div>
      
      {todos.length > 0 && (
        <div className="flex-shrink-0">
          <FilterControls currentFilter={filter} onFilterChange={setFilter} />
        </div>
      )}

      <div className="flex-grow overflow-y-auto mb-4 min-h-[200px]">
        {filteredTodos.length > 0 ? (
          <TodoList
            todos={filteredTodos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onEditTodo={editTodo}
          />
        ) : (
          <p className={`text-center py-4 text-slate-500`}>
            {todos.length === 0 ? (activeUserForTodos === currentUser ? "You have no tasks yet. Add one above!" : `${activeUserForTodos} has no tasks.`) : "No tasks match your current filter."}
          </p>
        )}
      </div>

      {todos.length > 0 && filteredTodos.length > 0 && todos.some(todo => todo.completed) && (
         <div className="flex-shrink-0 text-center pt-2"> 
            <button
                onClick={clearCompleted}
                className={`px-4 py-2 text-sm rounded-md transition-colors duration-200
                            text-slate-500 hover:text-red-600 hover:bg-slate-200
                            focus:outline-none focus:ring-1 focus:ring-red-500`}
                aria-label="Clear completed tasks"
            >
                Clear Completed ({todos.filter(todo => todo.completed).length})
            </button>
        </div>
      )}
    </div>
  );
};

export default App;