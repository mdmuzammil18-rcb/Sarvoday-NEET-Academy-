
import React, { useState } from 'react';
import { Todo, FilterStatus, Role, TeacherSection } from '../types';
import { DashboardSection } from './teacher/DashboardSection';
import { TasksSection } from './teacher/TasksSection';
import { StudentsSection } from './teacher/StudentsSection';
import { AnnouncementsSection } from './teacher/AnnouncementsSection';
import { PlaceholderSection } from './teacher/PlaceholderSection';

interface TeacherHomeScreenProps {
  currentUser: string;
  currentUserRole: Role;
  handleLogout: () => void;
  
  // For TasksSection
  todos: Todo[];
  filteredTodos: Todo[];
  filter: FilterStatus;
  setFilter: (filter: FilterStatus) => void;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
  clearCompleted: () => void;
}

const sectionIcons: Record<TeacherSection, string> = {
  [TeacherSection.DASHBOARD]: 'fas fa-tachometer-alt',
  [TeacherSection.TASKS]: 'fas fa-tasks',
  [TeacherSection.STUDENTS]: 'fas fa-users',
  [TeacherSection.ANNOUNCEMENTS]: 'fas fa-bullhorn',
  [TeacherSection.ATTENDANCE]: 'fas fa-user-check',
  [TeacherSection.ASSIGNMENTS]: 'fas fa-file-alt',
  [TeacherSection.GRADES]: 'fas fa-graduation-cap',
  [TeacherSection.TESTS]: 'fas fa-vial',
  [TeacherSection.TIMETABLE]: 'fas fa-calendar-alt',
  [TeacherSection.MESSAGES]: 'fas fa-comments',
  [TeacherSection.PROFILE_SETTINGS]: 'fas fa-cog',
};

const NavItem: React.FC<{
  section: TeacherSection;
  currentSection: TeacherSection;
  onClick: () => void;
  isSidebarOpen: boolean;
}> = ({ section, currentSection, onClick, isSidebarOpen }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150
                ${ currentSection === section 
                    ? 'bg-sky-600 text-white shadow-md' 
                    : 'text-slate-700 hover:bg-sky-100 hover:text-sky-700'
                }
                ${!isSidebarOpen ? 'justify-center' : ''}`}
    title={section}
  >
    <i className={`${sectionIcons[section]} ${isSidebarOpen ? 'mr-3 w-5 text-center' : 'w-5 text-center text-lg'}`}></i>
    {isSidebarOpen && <span className="truncate">{section}</span>}
  </button>
);

export const TeacherHomeScreen: React.FC<TeacherHomeScreenProps> = (props) => {
  const { currentUser, handleLogout, todos } = props;
  const [activeSection, setActiveSection] = useState<TeacherSection>(TeacherSection.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open on larger screens

  const navSections = [
    TeacherSection.DASHBOARD,
    TeacherSection.TASKS,
    TeacherSection.STUDENTS,
    TeacherSection.ANNOUNCEMENTS,
  ];
  const placeholderSections = [
    TeacherSection.ATTENDANCE,
    TeacherSection.ASSIGNMENTS,
    TeacherSection.GRADES,
    TeacherSection.TESTS,
    TeacherSection.TIMETABLE,
    TeacherSection.MESSAGES,
    TeacherSection.PROFILE_SETTINGS,
  ];

  const pendingTasksCount = todos.filter(task => !task.completed).length;

  const renderSection = () => {
    switch (activeSection) {
      case TeacherSection.DASHBOARD:
        return <DashboardSection pendingTasksCount={pendingTasksCount} />;
      case TeacherSection.TASKS:
        return <TasksSection {...props} />;
      case TeacherSection.STUDENTS:
        return <StudentsSection />;
      case TeacherSection.ANNOUNCEMENTS:
        return <AnnouncementsSection currentUser={currentUser} />;
      default:
        return <PlaceholderSection sectionName={activeSection} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside 
        className={`transition-all duration-300 ease-in-out bg-white shadow-lg
                    ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col p-4 space-y-2 border-r border-slate-200`}
      >
        <div className={`flex items-center mb-6 ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
            {isSidebarOpen && (
                 <h1 className="text-2xl font-bold text-sky-600 truncate">Sarvoday</h1>
            )}
            <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                className="p-2 rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
                <i className={`fas ${isSidebarOpen ? 'fa-angle-double-left' : 'fa-angle-double-right'} text-slate-600`}></i>
            </button>
        </div>

        <nav className="flex-grow space-y-1.5">
          {navSections.map(section => (
            <NavItem 
              key={section} 
              section={section} 
              currentSection={activeSection} 
              onClick={() => setActiveSection(section)}
              isSidebarOpen={isSidebarOpen} 
            />
          ))}
          <hr className="my-2 border-slate-200" />
           {placeholderSections.map(section => (
            <NavItem 
              key={section} 
              section={section} 
              currentSection={activeSection} 
              onClick={() => setActiveSection(section)}
              isSidebarOpen={isSidebarOpen} 
            />
          ))}
        </nav>
        
        <div className="mt-auto">
           <button
            onClick={handleLogout}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150
                        text-red-600 hover:bg-red-100 
                        ${!isSidebarOpen ? 'justify-center' : ''}`}
            title="Logout"
          >
            <i className={`fas fa-sign-out-alt ${isSidebarOpen ? 'mr-3 w-5 text-center' : 'w-5 text-center text-lg'}`}></i>
            {isSidebarOpen && <span className="truncate">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-700">{activeSection}</h2>
            <div className="text-sm text-slate-600">
              Welcome, <span className="font-medium">{currentUser}</span>!
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};
