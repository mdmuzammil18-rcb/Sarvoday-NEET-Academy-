
import React from 'react';
import { User, Role } from '../types';

interface AdminPanelProps {
  users: User[];
  currentUserUsername: string;
  adminViewingUsername: string | null;
  onSelectUserToView: (username: string) => void;
  onViewOwnTodos: () => void;
  onDeleteUser: (username: string) => void;
  // isDarkMode: boolean; // Removed
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  users,
  currentUserUsername,
  adminViewingUsername,
  onSelectUserToView,
  onViewOwnTodos,
  onDeleteUser,
}) => {
  // Light mode button styles
  const buttonBaseClass = "px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const lightButtonClass = "bg-slate-200 text-slate-700 hover:bg-slate-300 focus:ring-slate-400";
  const activeLightButtonClass = "bg-sky-600 text-white focus:ring-sky-500";
  const deleteLightButtonClass = "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400";

  const roleBadgeClass = (role: Role) => {
    if (role === Role.TEACHER) {
      return 'bg-indigo-500 text-white'; // Light mode teacher badge
    }
    return 'bg-teal-500 text-white'; // Light mode student badge
  };

  const sortedUsers = [...users].sort((a, b) => a.username.localeCompare(b.username));


  return (
    // Light mode panel styles
    <div className={`p-4 mb-6 rounded-lg shadow bg-slate-100 border border-slate-200`}>
      <h3 className={`text-xl font-semibold mb-3 text-sky-600`}>Admin Panel</h3>
      
      {adminViewingUsername && adminViewingUsername !== currentUserUsername && (
        <button
          onClick={onViewOwnTodos}
          className={`${buttonBaseClass} ${lightButtonClass} mb-4 w-full sm:w-auto`}
        >
          <i className="fas fa-user-circle mr-2"></i>View My Own Tasks
        </button>
      )}

      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {sortedUsers.map(user => {
          const isAdminUser = user.isAdmin;
          const isCurrentUser = user.username === currentUserUsername;
          const isOnlyAdmin = isAdminUser && users.filter(u => u.isAdmin).length <= 1;
          
          return (
            <div 
              key={user.username} 
              // Light mode user item styles
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-md bg-slate-50`}
            >
              <div className="flex-grow truncate mr-2">
                  <span className={`font-medium text-slate-700`}>
                  {user.username}
                  </span>
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${roleBadgeClass(user.role)}`}>{user.role}</span>
                  {isAdminUser && <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full bg-amber-500 text-white`}>Admin</span>}
                  {isCurrentUser && <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full bg-green-500 text-white`}>You</span>}
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0 flex-shrink-0">
                <button
                  onClick={() => onSelectUserToView(user.username)}
                  disabled={adminViewingUsername === user.username}
                  className={`${buttonBaseClass} 
                              ${adminViewingUsername === user.username 
                                  ? activeLightButtonClass
                                  : lightButtonClass}
                              focus:ring-offset-slate-100`}
                  aria-label={`View tasks for ${user.username}`}
                >
                  <i className="fas fa-eye mr-1"></i> <span className="hidden sm:inline">View</span>
                </button>
                <button
                  onClick={() => onDeleteUser(user.username)}
                  disabled={isCurrentUser && isOnlyAdmin}
                  className={`${buttonBaseClass} 
                              ${deleteLightButtonClass}
                              focus:ring-offset-slate-100
                              ${(isCurrentUser && isOnlyAdmin) ? 'opacity-50 cursor-not-allowed' : ''}
                              `}
                  aria-label={`Delete user ${user.username}`}
                >
                   <i className="fas fa-trash-alt mr-1"></i> <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          )}
        )}
      </div>
      {users.length === 0 && <p className={`text-slate-500 text-sm`}>No users registered yet.</p>}
      {users.length === 1 && users[0].username === currentUserUsername && <p className={`text-slate-500 text-sm mt-2`}>No other users registered yet.</p>}
    </div>
  );
};
