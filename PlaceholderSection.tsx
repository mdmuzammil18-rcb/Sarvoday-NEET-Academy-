
import React from 'react';
import { TeacherSection } from '../../types';

interface PlaceholderSectionProps {
  sectionName: TeacherSection;
}

export const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ sectionName }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white rounded-xl shadow-lg">
      <i className="fas fa-tools text-5xl text-slate-400 mb-6"></i>
      <h2 className="text-3xl font-semibold text-slate-700 mb-2">
        {sectionName} - Coming Soon!
      </h2>
      <p className="text-slate-500 max-w-md">
        This section is currently under development. We're working hard to bring you this feature.
        Please check back later!
      </p>
    </div>
  );
};
