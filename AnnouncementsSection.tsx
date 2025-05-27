
import React, { useState, useEffect, useCallback } from 'react';
import { Announcement } from '../../types';

interface AnnouncementsSectionProps {
  currentUser: string; // For scoping announcements in localStorage
}

const ANNOUNCEMENTS_STORAGE_KEY_PREFIX = 'announcementsApp.teacher.';

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({ currentUser }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [showForm, setShowForm] = useState(false);

  const storageKey = `${ANNOUNCEMENTS_STORAGE_KEY_PREFIX}${currentUser}`;

  const loadAnnouncements = useCallback(() => {
    try {
      const storedAnnouncements = localStorage.getItem(storageKey);
      setAnnouncements(storedAnnouncements ? JSON.parse(storedAnnouncements) : []);
    } catch (error) {
      console.error("Failed to load announcements:", error);
      setAnnouncements([]);
    }
  }, [storageKey]);

  const saveAnnouncements = useCallback((updatedAnnouncements: Announcement[]) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(updatedAnnouncements));
    } catch (error) {
      console.error("Failed to save announcements:", error);
    }
  }, [storageKey]);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      content: newContent.trim(),
      author: currentUser,
      createdAt: Date.now(),
    };
    const updatedAnnouncements = [newAnnouncement, ...announcements];
    setAnnouncements(updatedAnnouncements);
    saveAnnouncements(updatedAnnouncements);
    setNewTitle('');
    setNewContent('');
    setShowForm(false);
  };
  
  const handleDeleteAnnouncement = (id: string) => {
    const updatedAnnouncements = announcements.filter(ann => ann.id !== id);
    setAnnouncements(updatedAnnouncements);
    saveAnnouncements(updatedAnnouncements);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-700">Class Announcements</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300
                      ${showForm ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-sky-600 hover:bg-sky-700 text-white'}
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
        >
          <i className={`fas ${showForm ? 'fa-times' : 'fa-plus'} mr-2`}></i>
          {showForm ? 'Cancel' : 'New Announcement'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 ease-out">
          <form onSubmit={handleAddAnnouncement} className="space-y-4">
            <div>
              <label htmlFor="announcementTitle" className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input
                id="announcementTitle"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Announcement Title"
                className="w-full p-3 rounded-lg border-2 border-slate-300 bg-slate-50 focus:border-sky-500 focus:ring-sky-500 focus:outline-none focus:ring-1"
                required
              />
            </div>
            <div>
              <label htmlFor="announcementContent" className="block text-sm font-medium text-slate-700 mb-1">Content</label>
              <textarea
                id="announcementContent"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Write your announcement here..."
                rows={4}
                className="w-full p-3 rounded-lg border-2 border-slate-300 bg-slate-50 focus:border-sky-500 focus:ring-sky-500 focus:outline-none focus:ring-1"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-semibold bg-sky-600 hover:bg-sky-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Post Announcement
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {announcements.length > 0 ? (
          announcements.map(ann => (
            <div key={ann.id} className="bg-white p-5 rounded-xl shadow-lg relative group">
               <button 
                onClick={() => handleDeleteAnnouncement(ann.id)}
                className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:bg-red-100 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-red-500"
                aria-label="Delete announcement"
               >
                 <i className="fas fa-trash-alt text-xs"></i>
               </button>
              <h4 className="text-lg font-semibold text-sky-700 mb-1">{ann.title}</h4>
              <p className="text-sm text-slate-600 whitespace-pre-wrap mb-2">{ann.content}</p>
              <p className="text-xs text-slate-400">
                Posted by {ann.author === currentUser ? 'You' : ann.author} on {new Date(ann.createdAt).toLocaleDateString()} at {new Date(ann.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <i className="fas fa-info-circle text-3xl text-slate-400 mb-3"></i>
            <p className="text-slate-500">No announcements posted yet.</p>
             {!showForm && <p className="text-sm text-slate-400 mt-1">Click "New Announcement" to create one.</p>}
          </div>
        )}
      </div>
    </div>
  );
};
