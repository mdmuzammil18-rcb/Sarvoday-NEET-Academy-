
import React, { useState } from 'react';
import { StudentProfile } from '../../types';

const mockStudents: StudentProfile[] = [
  { id: 's1', name: 'Aarav Sharma', class: 'Grade 10A', lastActivity: 'Online 5 mins ago', overallGrade: 'A+', avatarUrl: 'https://via.placeholder.com/150/007bff/ffffff?Text=AS' },
  { id: 's2', name: 'Priya Singh', class: 'Grade 9B', lastActivity: 'Online 1 hour ago', overallGrade: 'A', avatarUrl: 'https://via.placeholder.com/150/28a745/ffffff?Text=PS' },
  { id: 's3', name: 'Rohan Mehta', class: 'Grade 10A', lastActivity: 'Offline', overallGrade: 'B+', avatarUrl: 'https://via.placeholder.com/150/ffc107/000000?Text=RM' },
  { id: 's4', name: 'Sneha Reddy', class: 'Grade 9A', lastActivity: 'Online 20 mins ago', overallGrade: 'A', avatarUrl: 'https://via.placeholder.com/150/dc3545/ffffff?Text=SR' },
  { id: 's5', name: 'Vikram Kumar', class: 'Grade 10B', lastActivity: 'Online', overallGrade: 'A-', avatarUrl: 'https://via.placeholder.com/150/17a2b8/ffffff?Text=VK' },
];

export const StudentsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-xl font-semibold text-slate-700">Manage Students</h3>
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search students or classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 rounded-lg border-2 border-slate-300 bg-slate-50 focus:border-sky-500 focus:ring-sky-500 focus:outline-none focus:ring-1 transition-colors"
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        {filteredStudents.length > 0 ? (
          <ul className="space-y-4">
            {filteredStudents.map(student => (
              <li key={student.id} className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-150">
                <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                  <img 
                    src={student.avatarUrl || `https://via.placeholder.com/150/cccccc/000000?Text=${student.name.substring(0,1)}`} 
                    alt={student.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
                  />
                  <div>
                    <p className="font-medium text-slate-800">{student.name}</p>
                    <p className="text-xs text-slate-500">{student.class} - {student.lastActivity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${student.overallGrade && student.overallGrade.startsWith('A') ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    Grade: {student.overallGrade || 'N/A'}
                  </span>
                  <button className="p-2 rounded-md text-slate-500 hover:bg-slate-200 hover:text-sky-600 transition-colors">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-slate-500 py-8">No students found matching your search.</p>
        )}
      </div>
    </div>
  );
};
