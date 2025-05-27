import React from 'react';
import { Todo, FilterStatus } from '../../types';
import { AddTodoForm } from '../AddTodoForm';
import { TodoList } from '../TodoList';
import { FilterControls } from '../FilterControls';

interface StudentTasksSectionProps {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: FilterStatus;
  setFilter: (filter: FilterStatus) => void;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
  clearCompleted: () => void;
}

export const StudentTasksSection: React.FC<StudentTasksSectionProps> = ({
  todos,
  filteredTodos,
  filter,
  setFilter,
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  clearCompleted,
}) => {
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-slate-700 mb-1">Manage Your Tasks</h3>
      <p className="text-sm text-slate-500 mb-6">Stay organized and on top of your responsibilities.</p>
      
      <AddTodoForm onAddTodo={addTodo} />

      {todos.length > 0 && (
        <FilterControls currentFilter={filter} onFilterChange={setFilter} />
      )}

      <div className="min-h-[200px]">
        {filteredTodos.length > 0 ? (
          <TodoList
            todos={filteredTodos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onEditTodo={editTodo}
          />
        ) : (
          <div className="text-center py-8">
            <i className="fas fa-clipboard-check text-4xl text-emerald-400 mb-3"></i>
            <p className="text-slate-500">
              {todos.length === 0 ? "No tasks yet. Add something you need to do!" : "No tasks match your current filter."}
            </p>
          </div>
        )}
      </div>

      {todos.length > 0 && completedCount > 0 && (
        <div className="text-center mt-6 pt-4 border-t border-slate-200">
          <button
            onClick={clearCompleted}
            className={`px-4 py-2 text-sm rounded-md transition-colors duration-200
                        text-slate-500 hover:text-red-600 hover:bg-red-50
                        focus:outline-none focus:ring-1 focus:ring-red-500`}
            aria-label="Clear completed tasks"
          >
            Clear Completed ({completedCount})
          </button>
        </div>
      )}
    </div>
  );
};