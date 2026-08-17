const priorities = new Set(["low", "medium", "high"]);

export function createTodo(title, priority = "medium", id = globalThis.crypto?.randomUUID?.() ?? String(Date.now())) {
  const cleanTitle = title.trim();

  if (!cleanTitle) {
    throw new Error("Le titre est obligatoire.");
  }

  if (!priorities.has(priority)) {
    throw new Error("La priorité est invalide.");
  }

  return { id, title: cleanTitle, priority, completed: false };
}

export function toggleTodo(todos, id) {
  return todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
}

export function removeTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}

export function removeCompleted(todos) {
  return todos.filter((todo) => !todo.completed);
}

export function visibleTodos(todos, filter = "all", query = "") {
  const normalizedQuery = query.trim().toLowerCase();

  return todos.filter((todo) => {
    const matchesFilter = filter === "done" ? todo.completed : filter === "open" ? !todo.completed : true;
    const matchesQuery = !normalizedQuery || todo.title.toLowerCase().includes(normalizedQuery);
    return matchesFilter && matchesQuery;
  });
}

export function getProgress(todos) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  return { total, completed, percentage: total ? Math.round((completed / total) * 100) : 0 };
}
