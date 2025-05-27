import React, { useState } from 'react';
import { Todo, FilterStatus, Role, StudentSection } from '../types';
import { StudentDashboardSection } from './student/StudentDashboardSection';
import { StudentTasksSection } from './student/StudentTasksSection';
import { StudentAcademicProgressSection } from './student/StudentAcademicProgressSection';
import { StudentClassInteractionSection } from './student/StudentClassInteractionSection';
import { StudentResourcesSection } from './student/StudentResourcesSection';
import { StudentPlaceholderSection } from './student/StudentPlaceholderSection';


interface StudentHomeScreenProps {
  currentUser: string;
  currentUserRole: Role; // Should be Role.STUDENT
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

const sectionIcons: Record<StudentSection, string> = {
  [StudentSection.DASHBOARD]: 'fas fa-home',
  [StudentSection.MY_TASKS]: 'fas fa-check-circle',
  [StudentSection.ACADEMIC_PROGRESS]: 'fas fa-chart-line',
  [StudentSection.CLASS_INTERACTION]: 'fas fa-users',
  [StudentSection.RESOURCES]: 'fas fa-book-reader',
  [StudentSection.ATTENDANCE]: 'fas fa-user-clock',
  [StudentSection.ASSIGNMENTS]: 'fas fa-file-signature',
  [StudentSection.GRADES]: 'fas fa-graduation-cap',
  [StudentSection.TIMETABLE]: 'fas fa-calendar-alt',
  [StudentSection.MESSAGES]: 'fas fa-envelope',
  [StudentSection.STUDY_MATERIALS]: 'fas fa-book',
  [StudentSection.PROFILE_SETTINGS]: 'fas fa-user-cog',
};

const NavItem: React.FC<{
  section: StudentSection;
  currentSection: StudentSection;
  onClick: () => void;
  isSidebarOpen: boolean;
}> = ({ section, currentSection, onClick, isSidebarOpen }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150
                ${ currentSection === section 
                    ? 'bg-emerald-500 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                }
                ${!isSidebarOpen ? 'justify-center' : ''}`}
    title={section}
  >
    <i className={`${sectionIcons[section]} ${isSidebarOpen ? 'mr-3 w-5 text-center' : 'w-5 text-center text-lg'}`}></i>
    {isSidebarOpen && <span className="truncate">{section}</span>}
  </button>
);

export const StudentHomeScreen: React.FC<StudentHomeScreenProps> = (props) => {
  const { currentUser, handleLogout, todos } = props;
  const [activeSection, setActiveSection] = useState<StudentSection>(StudentSection.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navSections = [
    StudentSection.DASHBOARD,
    StudentSection.MY_TASKS,
    StudentSection.ACADEMIC_PROGRESS,
    StudentSection.CLASS_INTERACTION,
    StudentSection.RESOURCES,
  ];
  const placeholderSections = [
    StudentSection.ATTENDANCE,
    StudentSection.ASSIGNMENTS,
    StudentSection.GRADES,
    StudentSection.TIMETABLE,
    StudentSection.MESSAGES,
    StudentSection.STUDY_MATERIALS,
    StudentSection.PROFILE_SETTINGS,
  ];

  const pendingTasksCount = todos.filter(task => !task.completed).length;

  const renderSection = () => {
    switch (activeSection) {
      case StudentSection.DASHBOARD:
        return <StudentDashboardSection pendingTasksCount={pendingTasksCount} todos={todos} />;
      case StudentSection.MY_TASKS:
        return <StudentTasksSection {...props} />;
      case StudentSection.ACADEMIC_PROGRESS:
        return <StudentAcademicProgressSection />;
      case StudentSection.CLASS_INTERACTION:
        return <StudentClassInteractionSection />;
      case StudentSection.RESOURCES:
        return <StudentResourcesSection />;
      default:
        return <StudentPlaceholderSection sectionName={activeSection} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside 
        className={`transition-all duration-300 ease-in-out bg-white shadow-lg
                    ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col p-3 space-y-1.5 border-r border-slate-200`}
      >
        <div className={`flex items-center mb-5 ${isSidebarOpen ? 'justify-between pl-1' : 'justify-center'}`}>
            {isSidebarOpen && (
                 <h1 className="text-2xl font-bold text-emerald-600 truncate">Student Hub</h1>
            )}
            <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                className="p-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
                <i className={`fas ${isSidebarOpen ? 'fa-angle-double-left' : 'fa-angle-double-right'}`}></i>
            </button>
        </div>

        <nav className="flex-grow space-y-1">
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
        
        <div className="mt-auto pt-2 border-t border-slate-200">
           <button
            onClick={handleLogout}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150
                        text-red-500 hover:bg-red-50 hover:text-red-600
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
              Welcome, <span className="font-medium text-emerald-600">{currentUser}</span>!
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-100">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};