
import React from 'react';

interface DashboardSectionProps {
  pendingTasksCount: number;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: string; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4">
    <div className={`p-3 rounded-full ${color} text-white text-2xl`}>
      <i className={icon}></i>
    </div>
    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-semibold text-slate-700">{value}</p>
    </div>
  </div>
);

const NotificationItem: React.FC<{ title: string; time: string; icon: string; iconColor: string }> = ({ title, time, icon, iconColor }) => (
    <div className="flex items-start space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors duration-150">
        <div className={`mt-1 p-2 rounded-full ${iconColor} text-white text-xs`}>
            <i className={icon}></i>
        </div>
        <div>
            <p className="text-sm font-medium text-slate-700">{title}</p>
            <p className="text-xs text-slate-400">{time}</p>
        </div>
    </div>
);


export const DashboardSection: React.FC<DashboardSectionProps> = ({ pendingTasksCount }) => {
  const mockNotifications = [
    { id: '1', title: "Parent-Teacher Meeting scheduled for Grade 10", time: "2 hours ago", icon: "fas fa-calendar-check", iconColor: "bg-sky-500" },
    { id: '2', title: "New curriculum update for Physics", time: "1 day ago", icon: "fas fa-book-open", iconColor: "bg-green-500" },
    { id: '3', title: "Staff meeting at 3 PM in Conference Room A", time: "3 days ago", icon: "fas fa-users", iconColor: "bg-amber-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Quick Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Pending Tasks" value={pendingTasksCount} icon="fas fa-clipboard-list" color="bg-amber-500" />
          <StatCard title="Today's Schedule" value="4 Classes" icon="fas fa-calendar-day" color="bg-sky-500" />
          <StatCard title="Assigned Classes" value="Grade 9, 10" icon="fas fa-chalkboard-teacher" color="bg-green-500" />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Notifications & Updates</h3>
        <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="space-y-2">
                {mockNotifications.map(notif => (
                    <NotificationItem key={notif.id} {...notif} />
                ))}
                 {mockNotifications.length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-4">No new notifications.</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
