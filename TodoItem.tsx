
import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, newText: string) => void;
  // isDarkMode: boolean; // Removed
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleTodo, onDeleteTodo, onEditTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEditTodo(todo.id, editText.trim());
    } else {
        setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    // Light mode styles
    <li className={`flex items-center p-3 rounded-lg transition-all duration-300 group
                   bg-slate-100 hover:bg-slate-200/80
                   ${todo.completed && 'opacity-70'}`}>
      
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleTodo(todo.id)}
        // Light mode styles
        className={`form-checkbox h-5 w-5 rounded border-2 transition-colors duration-300 cursor-pointer
                    border-slate-400 bg-white checked:bg-sky-600 checked:border-sky-600 focus:ring-sky-500
                    focus:ring-offset-0 focus:ring-2 mr-3`}
      />
      
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave} 
          onKeyDown={handleKeyDown}
          // Light mode styles
          className={`flex-grow py-1 px-2 rounded border-2 outline-none focus:ring-1
                      bg-white border-slate-300 text-slate-800 focus:border-sky-500 focus:ring-sky-500`}
        />
      ) : (
        <span
          onClick={() => !todo.completed && handleEdit()}
          // Light mode styles
          className={`flex-grow cursor-pointer ${todo.completed ? 'line-through' : ''} 
                      ${todo.completed ? 'text-slate-500' : 'text-slate-700'}
                      ${!todo.completed && 'hover:text-sky-600'}`}
        >
          {todo.text}
        </span>
      )}

      {!isEditing && (
        <button
          onClick={handleEdit}
          // Light mode styles
          className={`ml-auto mr-2 p-1 rounded text-sm transition-colors duration-200 opacity-0 group-hover:opacity-100
                      text-slate-500 hover:text-sky-600
                      focus:outline-none focus:ring-1 focus:ring-sky-500`}
          aria-label="Edit todo"
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
      )}
      
      <button
        onClick={() => onDeleteTodo(todo.id)}
        // Light mode styles
        className={`ml-2 p-1 rounded text-sm transition-colors duration-200 opacity-0 group-hover:opacity-100
                    text-slate-500 hover:text-red-600
                    focus:outline-none focus:ring-1 focus:ring-red-500`}
        aria-label="Delete todo"
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    </li>
  );
};
