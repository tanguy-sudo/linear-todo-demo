import { createTodo, getProgress, removeCompleted, removeTodo, toggleTodo, visibleTodos } from "./todos.mjs";

const storageKey = "linear-todo-demo.todos";
const priorityLabels = { high: "Haute", medium: "Normale", low: "Basse" };
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const priority = document.querySelector("#todo-priority");
const list = document.querySelector("#todo-list");
const feedback = document.querySelector("#feedback");
const progressCopy = document.querySelector("#progress-copy");
const progressValue = document.querySelector("#progress-value");
const progressRing = document.querySelector(".progress-ring");
const clearCompletedButton = document.querySelector("#clear-completed");
const filterButtons = document.querySelectorAll("[data-filter]");

let todos = loadTodos();
let currentFilter = "all";

function loadTodos() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(saved)
      ? saved.filter((todo) => todo && typeof todo.id === "string" && typeof todo.title === "string")
      : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(storageKey, JSON.stringify(todos));
}

function render() {
  const progress = getProgress(todos);
  const visible = visibleTodos(todos, currentFilter);

  progressCopy.textContent = progress.total
    ? `${progress.completed} tâche${progress.completed > 1 ? "s" : ""} terminée${progress.completed > 1 ? "s" : ""} sur ${progress.total}`
    : "Aucune tâche pour le moment.";
  progressValue.textContent = `${progress.percentage}%`;
  progressRing.style.setProperty("--progress", `${progress.percentage}%`);
  clearCompletedButton.hidden = progress.completed === 0;
  list.replaceChildren();

  if (!visible.length) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = todos.length ? "Aucune tâche dans ce filtre." : "Ta liste est prête. Ajoute ta première tâche.";
    list.append(empty);
    return;
  }

  visible.forEach((todo) => list.append(createTodoElement(todo)));
}

function createTodoElement(todo) {
  const item = document.createElement("li");
  item.className = `todo-item${todo.completed ? " is-done" : ""}`;

  const checkbox = document.createElement("input");
  checkbox.className = "todo-toggle";
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.dataset.action = "toggle";
  checkbox.dataset.id = todo.id;
  checkbox.setAttribute("aria-label", `Marquer « ${todo.title} » comme terminée`);

  const title = document.createElement("span");
  title.className = "todo-title";
  title.textContent = todo.title;

  const meta = document.createElement("div");
  meta.className = "todo-meta";

  const badge = document.createElement("span");
  badge.className = `priority priority-${todo.priority}`;
  badge.textContent = priorityLabels[todo.priority] ?? "Normale";

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.type = "button";
  deleteButton.dataset.action = "delete";
  deleteButton.dataset.id = todo.id;
  deleteButton.setAttribute("aria-label", `Supprimer « ${todo.title} »`);
  deleteButton.textContent = "×";

  meta.append(badge, deleteButton);
  item.append(checkbox, title, meta);
  return item;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    todos = [createTodo(input.value, priority.value), ...todos];
    saveTodos();
    form.reset();
    feedback.textContent = "Tâche ajoutée.";
    input.focus();
    render();
  } catch (error) {
    feedback.textContent = error.message;
  }
});

list.addEventListener("change", (event) => {
  if (event.target.dataset.action !== "toggle") return;
  todos = toggleTodo(todos, event.target.dataset.id);
  saveTodos();
  render();
});

list.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action='delete']");
  if (!button) return;
  todos = removeTodo(todos, button.dataset.id);
  saveTodos();
  feedback.textContent = "Tâche supprimée.";
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => filterButton.classList.toggle("is-active", filterButton === button));
    render();
  });
});

clearCompletedButton.addEventListener("click", () => {
  todos = removeCompleted(todos);
  saveTodos();
  feedback.textContent = "Tâches terminées effacées.";
  render();
});

render();
