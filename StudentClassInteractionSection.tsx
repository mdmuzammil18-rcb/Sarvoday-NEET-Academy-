import React from 'react';

interface AnnouncementCardProps {
  title: string;
  author: string;
  date: string;
  contentSnippet: string;
  icon: string;
  color: string;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ title, author, date, contentSnippet, icon, color }) => (
  <div className={`p-5 rounded-lg border-l-4 ${color} bg-opacity-10 ${color.replace('border-', 'bg-').replace('-500', '-50')} hover:shadow-md transition-shadow`}>
    <div className="flex items-center mb-2">
      <i className={`${icon} ${color.replace('border-','text-')} mr-3 text-xl`}></i>
      <h4 className="text-md font-semibold text-slate-800 flex-grow">{title}</h4>
    </div>
    <p className="text-xs text-slate-500 mb-1">By {author} - {date}</p>
    <p className="text-sm text-slate-600 line-clamp-2">{contentSnippet}</p>
    <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium mt-2">
      Read More <i className="fas fa-arrow-right ml-1"></i>
    </button>
  </div>
);


export const StudentClassInteractionSection: React.FC = () => {
  const mockAnnouncements = [
    { id: 'a1', title: "Midterm Exam Schedule Update", author: "Prof. Einstein", date: "Oct 26, 2023", contentSnippet: "Please note a slight change in the Physics midterm exam timing. It will now be held...", icon: "fas fa-scroll", color: "border-sky-500" },
    { id: 'a2', title: "Assignment 3 Deadline Extended", author: "Prof. Curie", date: "Oct 25, 2023", contentSnippet: "The deadline for Assignment 3 (Modern Chemistry) has been extended by two days due to...", icon: "fas fa-file-alt", color: "border-amber-500" },
    { id: 'a3', title: "Guest Lecture on Quantum Computing", author: "Admin Office", date: "Oct 24, 2023", contentSnippet: "We are excited to announce a guest lecture by Dr. Feynman on the basics of Quantum Computing...", icon: "fas fa-microphone-alt", color: "border-purple-500"},
  ];

  return (
    <div className="space-y-8">
      {/* Teacher Announcements */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Recent Teacher Announcements</h3>
        {mockAnnouncements.length > 0 ? (
          <div className="space-y-4">
            {mockAnnouncements.map(ann => <AnnouncementCard key={ann.id} {...ann} />)}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-4">No new announcements from teachers at the moment.</p>
        )}
      </div>

      {/* Class Discussions & Assignment Submission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-slate-700 mb-4 flex items-center">
            <i className="fas fa-comments text-emerald-500 mr-3"></i>Class Discussions
          </h3>
          <p className="text-slate-500 mb-4">Engage with your classmates and teachers.</p>
          {/* Placeholder for discussion list or link */}
          <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-lg">
            <i className="fas fa-comments text-3xl text-slate-300 mb-2"></i>
            <p className="text-slate-400 text-sm">Discussion threads coming soon!</p>
          </div>
           <button className="mt-4 w-full bg-emerald-500 text-white px-4 py-2.5 rounded-lg hover:bg-emerald-600 transition-colors font-medium">
            Go to Discussions
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-slate-700 mb-4 flex items-center">
            <i className="fas fa-paper-plane text-sky-500 mr-3"></i>Submit Work & Ask Questions
          </h3>
          <p className="text-slate-500 mb-4">Easily submit your assignments or reach out to your teachers.</p>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 bg-sky-50 text-sky-600 px-4 py-3 rounded-lg hover:bg-sky-100 transition-colors font-medium border border-sky-200">
              <i className="fas fa-upload"></i> Submit New Assignment
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-600 px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors font-medium border border-slate-200">
              <i className="fas fa-question-circle"></i> Ask a Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};