import React from 'react';
import { StudentCourseProgress } from '../../types';

interface ProgressBarProps {
  label: string;
  percentage: number;
  color: string; // Tailwind background color class e.g., 'bg-emerald-500'
  icon?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, percentage, color, icon }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-medium text-slate-700 flex items-center">
        {icon && <i className={`${icon} mr-2 text-slate-500`}></i>}
        {label}
      </span>
      <span className={`text-sm font-semibold ${color.replace('bg-','text-')}`}>{percentage}%</span>
    </div>
    <div className="w-full bg-slate-200 rounded-full h-3.5">
      <div
        className={`${color} h-3.5 rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} progress`}
      ></div>
    </div>
  </div>
);

export const StudentAcademicProgressSection: React.FC = () => {
  const mockProgressData: StudentCourseProgress[] = [
    { id: 'overall', subject: 'Overall Progress', attendance: 85, assignmentsCompleted: 90, averageTestScore: 78, icon: 'fas fa-chart-pie', color: 'bg-sky-500' },
    { id: 'math', subject: 'Mathematics', attendance: 92, assignmentsCompleted: 80, averageTestScore: 75, icon: 'fas fa-calculator', color: 'bg-emerald-500' },
    { id: 'physics', subject: 'Physics', attendance: 78, assignmentsCompleted: 95, averageTestScore: 82, icon: 'fas fa-atom', color: 'bg-amber-500' },
    { id: 'chemistry', subject: 'Chemistry', attendance: 88, assignmentsCompleted: 85, averageTestScore: 70, icon: 'fas fa-flask', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-slate-800 mb-2">Your Academic Journey</h3>
        <p className="text-slate-500 mb-6">Track your performance across subjects and stay motivated!</p>
        
        {mockProgressData.map(course => (
          <div key={course.id} className="mb-6 p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
            <h4 className="text-lg font-semibold text-slate-700 mb-3 flex items-center">
                {course.icon && <i className={`${course.icon} mr-3 ${course.color?.replace('bg-','text-')} w-5 text-center`}></i>}
                {course.subject}
            </h4>
            <ProgressBar label="Attendance" percentage={course.attendance} color={course.color || 'bg-gray-500'} />
            <ProgressBar label="Assignments Completed" percentage={course.assignmentsCompleted} color={course.color || 'bg-gray-500'} />
            <ProgressBar label="Average Test Score" percentage={course.averageTestScore} color={course.color || 'bg-gray-500'} />
             <div className="text-right mt-3">
                <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
                    View Detailed Report <i className="fas fa-angle-right ml-1"></i>
                </button>
            </div>
          </div>
        ))}
      </div>
       <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <i className="fas fa-award text-3xl text-amber-400 mb-3"></i>
            <h4 className="text-lg font-semibold text-slate-700">Keep it Up!</h4>
            <p className="text-sm text-slate-500">You're making great progress. Stay focused and aim high!</p>
      </div>
    </div>
  );
};