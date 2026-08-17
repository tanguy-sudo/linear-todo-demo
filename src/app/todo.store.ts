import { Injectable, signal } from '@angular/core';
import { createTodo, removeCompleted, removeTodo, Todo, TodoPriority, toggleTodo } from './todo';

const storageKey = 'linear-todo-demo.todos';

@Injectable({ providedIn: 'root' })
export class TodoStore {
  readonly todos = signal<Todo[]>(this.load());

  add(title: string, priority: TodoPriority): void {
    this.todos.update((todos) => [createTodo(title, priority), ...todos]);
    this.persist();
  }

  toggle(id: string): void {
    this.todos.update((todos) => toggleTodo(todos, id));
    this.persist();
  }

  remove(id: string): void {
    this.todos.update((todos) => removeTodo(todos, id));
    this.persist();
  }

  clearCompleted(): void {
    this.todos.update(removeCompleted);
    this.persist();
  }

  private load(): Todo[] {
    try {
      const saved = globalThis.localStorage?.getItem(storageKey);
      const todos: unknown = saved ? JSON.parse(saved) : [];
      return Array.isArray(todos)
        ? todos.filter(
            (todo): todo is Todo =>
              typeof todo === 'object' &&
              todo !== null &&
              typeof todo.id === 'string' &&
              typeof todo.title === 'string' &&
              typeof todo.priority === 'string' &&
              typeof todo.completed === 'boolean',
          )
        : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    globalThis.localStorage?.setItem(storageKey, JSON.stringify(this.todos()));
  }
}
