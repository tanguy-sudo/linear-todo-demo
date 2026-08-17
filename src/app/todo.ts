export type TodoPriority = 'low' | 'medium' | 'high';
export type TodoFilter = 'all' | 'open' | 'done';

export interface Todo {
  id: string;
  title: string;
  priority: TodoPriority;
  completed: boolean;
}

const priorities = new Set<TodoPriority>(['low', 'medium', 'high']);

export function createTodo(title: string, priority: TodoPriority = 'medium', id?: string): Todo {
  const cleanTitle = title.trim();

  if (!cleanTitle) {
    throw new Error('Le titre est obligatoire.');
  }

  if (!priorities.has(priority)) {
    throw new Error('La priorité est invalide.');
  }

  return {
    id: id ?? globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
    title: cleanTitle,
    priority,
    completed: false,
  };
}

export function toggleTodo(todos: Todo[], id: string): Todo[] {
  return todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
}

export function removeTodo(todos: Todo[], id: string): Todo[] {
  return todos.filter((todo) => todo.id !== id);
}

export function removeCompleted(todos: Todo[]): Todo[] {
  return todos.filter((todo) => !todo.completed);
}

export function visibleTodos(todos: Todo[], filter: TodoFilter = 'all', query = ''): Todo[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return todos.filter((todo) => {
    const matchesFilter = filter === 'done' ? todo.completed : filter === 'open' ? !todo.completed : true;
    const matchesQuery = !normalizedQuery || todo.title.toLocaleLowerCase().includes(normalizedQuery);
    return matchesFilter && matchesQuery;
  });
}

export function getProgress(todos: Todo[]): { total: number; completed: number; percentage: number } {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  return { total, completed, percentage: total ? Math.round((completed / total) * 100) : 0 };
}
