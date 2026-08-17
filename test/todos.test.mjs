import assert from "node:assert/strict";
import test from "node:test";
import { createTodo, getProgress, removeCompleted, removeTodo, toggleTodo, visibleTodos } from "../src/todos.mjs";

test("crée une tâche normalisée", () => {
  assert.deepEqual(createTodo("  Acheter du café  ", "high", "1"), {
    id: "1",
    title: "Acheter du café",
    priority: "high",
    completed: false,
  });
});

test("filtre, bascule et supprime les tâches", () => {
  const todos = [
    createTodo("Préparer la démo", "high", "1"),
    { ...createTodo("Répondre aux mails", "low", "2"), completed: true },
  ];

  assert.equal(visibleTodos(todos, "open").length, 1);
  assert.equal(visibleTodos(todos, "all", "MAILS")[0].id, "2");
  assert.equal(visibleTodos(todos, "done", "MAILS")[0].id, "2");
  assert.equal(visibleTodos(todos, "open", "MAILS").length, 0);
  assert.equal(toggleTodo(todos, "1")[0].completed, true);
  assert.equal(removeTodo(todos, "1").length, 1);
  assert.equal(removeCompleted(todos).length, 1);
});

test("calcule la progression", () => {
  const todos = [
    createTodo("Une", "medium", "1"),
    { ...createTodo("Deux", "medium", "2"), completed: true },
    { ...createTodo("Trois", "medium", "3"), completed: true },
  ];

  assert.deepEqual(getProgress(todos), { total: 3, completed: 2, percentage: 67 });
});
