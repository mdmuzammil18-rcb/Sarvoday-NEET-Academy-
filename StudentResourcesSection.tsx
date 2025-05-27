
import React from 'react';

interface ResourceCardProps {
  // Added id property to ResourceCardProps
  id: string; 
  title: string;
  description: string;
  icon: string;
  link: string; // Placeholder for actual link
  category: string;
  color: string; // e.g. 'text-emerald-500' or 'bg-emerald-500'
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, icon, link, category, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
    <div>
      <div className="flex items-center mb-3">
        <div className={`p-3 rounded-full mr-4 ${color.replace('text-','bg-').replace('-500', '-100')}`}>
          <i className={`${icon} ${color} text-2xl`}></i>
        </div>
        <div>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color.replace('text-','bg-').replace('-500','-100')} ${color}`}>{category}</span>
        </div>
      </div>
      <h4 className="text-lg font-semibold text-slate-800 mb-1">{title}</h4>
      <p className="text-sm text-slate-500 line-clamp-3 mb-4">{description}</p>
    </div>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`mt-auto inline-block w-full text-center px-4 py-2.5 rounded-lg font-medium transition-colors
                  ${color.replace('text-','bg-')} text-white hover:${color.replace('text-','bg-').replace('500','600')} `}
    >
      Access Resource <i className="fas fa-external-link-alt ml-1.5 text-xs"></i>
    </a>
  </div>
);

export const StudentResourcesSection: React.FC = () => {
  const mockResources: ResourceCardProps[] = [
    { 
      id: 'r1', 
      title: "Complete Physics Syllabus (2023-24)", 
      description: "Detailed syllabus for all topics covered in the current academic year for Physics.", 
      icon: "fas fa-book-open", 
      link: "#physics-syllabus", 
      category: "Syllabus",
      color: "text-sky-500"
    },
    { 
      id: 'r2', 
      title: "Mathematics Exam Preparation Guide", 
      description: "Tips, important formulas, and practice questions to help you ace your Math exams.", 
      icon: "fas fa-lightbulb", 
      link: "#math-exam-guide", 
      category: "Exam Guide",
      color: "text-emerald-500"
    },
    { 
      id: 'r3', 
      title: "Chemistry Lab Manuals", 
      description: "Access all lab experiment procedures, safety guidelines, and report templates.", 
      icon: "fas fa-vials", 
      link: "#chem-lab-manuals", 
      category: "Study Material",
      color: "text-amber-500"
    },
     { 
      id: 'r4', 
      title: "Library E-Resources Portal", 
      description: "Access thousands of e-books, journals, and research papers from the college library.", 
      icon: "fas fa-atlas", 
      link: "#library-portal", 
      category: "Library",
      color: "text-purple-500"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-slate-700">Knowledge Hub</h3>
        <p className="text-slate-500">Find all your study materials, guides, and support links here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {mockResources.map(resource => (
          // id is now a valid property of ResourceCardProps
          <ResourceCard key={resource.id} {...resource} />
        ))}
      </div>

      {mockResources.length === 0 && (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <i className="fas fa-empty-set text-3xl text-slate-400 mb-3"></i>
          <p className="text-slate-500">No resources available at the moment. Please check back later.</p>
        </div>
      )}
       <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
        <h4 className="text-lg font-semibold text-slate-700 mb-3">Need Help?</h4>
        <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-3 rounded-lg hover:bg-slate-200 transition-colors font-medium">
                <i className="fas fa-headset"></i> Contact Support
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-3 rounded-lg hover:bg-slate-200 transition-colors font-medium">
                <i className="fas fa-chalkboard-teacher"></i> Teacher Directory
            </button>
        </div>
      </div>
    </div>
  );
};
// Removed stray 'h' character from the end of the file