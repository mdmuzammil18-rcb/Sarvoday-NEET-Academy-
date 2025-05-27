
import React from 'react';
import { Todo, UpcomingStudentEvent } from '../../types';

interface StudentDashboardSectionProps {
  pendingTasksCount: number;
  todos: Todo[]; // For deriving upcoming deadlines if needed
}

const StatCard: React.FC<{ title: string; value: string | number; icon: string;bgColor: string; iconColor: string;}> = 
({ title, value, icon, bgColor, iconColor }) => (
  <div className={`p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4 ${bgColor}`}>
    <div className={`p-3 rounded-full bg-white/20 ${iconColor} text-2xl`}>
      <i className={icon}></i>
    </div>
    <div>
      <p className={`text-sm ${iconColor} opacity-90`}>{title}</p>
      <p className={`text-2xl font-semibold ${iconColor}`}>{value}</p>
    </div>
  </div>
);

const NotificationItem: React.FC<{ title: string; time: string; icon: string; iconBgColor: string; iconTextColor: string; type: 'Announcement' | 'Exam' | 'Message'}> = 
({ title, time, icon, iconBgColor, iconTextColor, type }) => (
    <div className="flex items-start space-x-3 p-3.5 hover:bg-slate-100 rounded-lg transition-colors duration-150 cursor-pointer border-b border-slate-100 last:border-b-0">
        <div className={`mt-1 p-2.5 rounded-full ${iconBgColor} ${iconTextColor} text-sm`}>
            <i className={icon}></i>
        </div>
        <div>
            <p className="text-xs text-slate-400 mb-0.5">{type}</p>
            <p className="text-sm font-medium text-slate-700">{title}</p>
            <p className="text-xs text-slate-500">{time}</p>
        </div>
    </div>
);

export const StudentDashboardSection: React.FC<StudentDashboardSectionProps> = ({ pendingTasksCount, todos }) => {
  const mockUpcomingEvents: UpcomingStudentEvent[] = [
    { id: 'e1', type: 'assignment', title: 'Physics Lab Report 3', subject: 'Physics', dueDate: 'Tomorrow', dueTime: '11:59 PM' },
    { id: 'e2', type: 'exam', title: 'Calculus Midterm Exam', subject: 'Mathematics', dueDate: '3 days left'},
    { id: 'e3', type: 'task', title: 'Prepare presentation for History', dueDate: 'This Friday'},
  ];
  
  const mockNotifications: Array<{ id: string; type: 'Announcement' | 'Exam' | 'Message'; title: string; time: string; icon: string; iconBgColor: string; iconTextColor: string; }> = [
    // Fixed type for 'type' property
    { id: 'n1', type: 'Announcement', title: "Guest lecture on AI by Dr. Smith cancelled", time: "30 mins ago", icon: "fas fa-bullhorn", iconBgColor: "bg-sky-100", iconTextColor: "text-sky-600" },
    // Fixed type for 'type' property
    { id: 'n2', type: 'Exam', title: "Results for Chemistry Quiz 2 are out!", time: "2 hours ago", icon: "fas fa-award", iconBgColor: "bg-green-100", iconTextColor: "text-green-600"},
    // Fixed type for 'type' property
    { id: 'n3', type: 'Message', title: "Prof. Davis replied to your query on Project X", time: "1 day ago", icon: "fas fa-envelope", iconBgColor: "bg-amber-100", iconTextColor: "text-amber-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div>
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Hey there! Here's your day at a glance:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Today's Schedule" value="3 Classes" icon="fas fa-calendar-day" bgColor="bg-sky-500" iconColor="text-white" />
          <StatCard title="Upcoming Deadlines" value={mockUpcomingEvents.length} icon="fas fa-hourglass-half" bgColor="bg-amber-500" iconColor="text-white" />
          <StatCard title="Pending Tasks" value={pendingTasksCount} icon="fas fa-clipboard-list" bgColor="bg-emerald-500" iconColor="text-white" />
        </div>
      </div>

      {/* Upcoming Deadlines & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Deadlines */}
        <div>
          <h3 className="text-xl font-semibold text-slate-700 mb-4">Don't Miss These!</h3>
          <div className="bg-white p-3 rounded-xl shadow-lg space-y-3">
            {mockUpcomingEvents.map(event => (
              <div key={event.id} className={`p-4 rounded-lg border-l-4 ${event.type === 'exam' ? 'border-red-400 bg-red-50' : event.type === 'assignment' ? 'border-amber-400 bg-amber-50' : 'border-sky-400 bg-sky-50'}`}>
                <div className="flex justify-between items-center">
                    <h4 className="font-medium text-slate-800">{event.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full text-white ${event.type === 'exam' ? 'bg-red-500' : event.type === 'assignment' ? 'bg-amber-500' : 'bg-sky-500'}`}>{event.type}</span>
                </div>
                {event.subject && <p className="text-xs text-slate-500">{event.subject}</p>}
                <p className="text-sm text-slate-600 mt-1">
                    <i className="far fa-clock mr-1.5"></i>{event.dueDate} {event.dueTime && `- ${event.dueTime}`}
                </p>
              </div>
            ))}
            {mockUpcomingEvents.length === 0 && <p className="text-sm text-slate-500 text-center py-4">No pressing deadlines right now. Great job!</p>}
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="text-xl font-semibold text-slate-700 mb-4">What's New?</h3>
          <div className="bg-white rounded-xl shadow-lg">
            {mockNotifications.map(notif => (
                <NotificationItem key={notif.id} {...notif} />
            ))}
            {mockNotifications.length === 0 && (
                <p className="text-sm text-slate-500 text-center p-6">No new notifications.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};