
import React, { useState } from 'react';

interface AddTodoFormProps {
  onAddTodo: (text: string) => void;
  // isDarkMode: boolean; // Removed
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-6 sm:mb-8 gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        // Light mode styles
        className={`flex-grow p-3 rounded-lg border-2 transition-colors duration-300
                    bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500
                    focus:outline-none focus:ring-1`}
      />
      <button
        type="submit"
        // Light mode styles
        className={`px-5 py-3 rounded-lg font-semibold transition-all duration-300
                    bg-sky-600 hover:bg-sky-700 text-white
                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-sky-600 focus:ring-offset-white`}
      >
        <i className="fas fa-plus mr-2 sm:mr-0"></i>
        <span className="hidden sm:inline">Add</span>
      </button>
    </form>
  );
};
