
import React from 'react';
import { Todo, FilterStatus } from '../../types';
import { AddTodoForm } from '../AddTodoForm';
import { TodoList } from '../TodoList';
import { FilterControls } from '../FilterControls';

interface TasksSectionProps {
  // Props for managing todos, passed down from App -> TeacherHomeScreen
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

export const TasksSection: React.FC<TasksSectionProps> = ({
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
    <div className="max-w-2xl mx-auto">
      <AddTodoForm onAddTodo={addTodo} />

      {todos.length > 0 && (
        <FilterControls currentFilter={filter} onFilterChange={setFilter} />
      )}

      {filteredTodos.length > 0 ? (
        <TodoList
          todos={filteredTodos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />
      ) : (
        <p className="text-center py-4 text-slate-500">
          {todos.length === 0 ? "You have no tasks yet. Add one above!" : "No tasks match your current filter."}
        </p>
      )}

      {todos.length > 0 && completedCount > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={clearCompleted}
            className={`px-4 py-2 text-sm rounded-md transition-colors duration-200
                        text-slate-500 hover:text-red-600 hover:bg-slate-200
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
