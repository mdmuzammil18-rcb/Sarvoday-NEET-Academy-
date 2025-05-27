
import React from 'react';
import { StudentSection } from '../../types'; // Using StudentSection type

interface StudentPlaceholderSectionProps {
  sectionName: StudentSection;
}

export const StudentPlaceholderSection: React.FC<StudentPlaceholderSectionProps> = ({ sectionName }) => {
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
  
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white rounded-xl shadow-lg">
      <i className={`${sectionIcons[sectionName] || 'fas fa-cogs'} text-5xl text-emerald-400 mb-6`}></i>
      <h2 className="text-3xl font-semibold text-slate-700 mb-2">
        {sectionName} - On The Horizon!
      </h2>
      <p className="text-slate-500 max-w-md">
        Great things are coming! This section is currently being crafted to enhance your experience.
        Stay tuned for updates!
      </p>
    </div>
  );
};
// Removed stray 'h' character from the end of the file