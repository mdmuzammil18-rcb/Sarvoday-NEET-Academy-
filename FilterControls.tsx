
import React from 'react';
import { FilterStatus } from '../types';

interface FilterControlsProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  // isDarkMode: boolean; // Removed
}

const filterOptions: FilterStatus[] = [FilterStatus.ALL, FilterStatus.ACTIVE, FilterStatus.COMPLETED];

export const FilterControls: React.FC<FilterControlsProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="flex justify-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
      {filterOptions.map(filter => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          // Light mode styles
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm font-medium transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-offset-2
                      focus:ring-offset-white
                      ${currentFilter === filter
                          ? 'bg-sky-600 text-white focus:ring-sky-500'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300 focus:ring-slate-400'
                      }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};
