import { Component, computed, inject, signal } from '@angular/core';
import { getProgress, TodoFilter, TodoPriority, visibleTodos } from './todo';
import { TodoStore } from './todo.store';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly store = inject(TodoStore);
  protected readonly todos = this.store.todos;
  protected readonly query = signal('');
  protected readonly filter = signal<TodoFilter>('all');
  protected readonly feedback = signal('');
  protected readonly visibleTodos = computed(() => visibleTodos(this.todos(), this.filter(), this.query()));
  protected readonly progress = computed(() => getProgress(this.todos()));

  protected addTodo(event: SubmitEvent, titleInput: HTMLInputElement, priorityInput: HTMLSelectElement): void {
    event.preventDefault();

    try {
      this.store.add(titleInput.value, priorityInput.value as TodoPriority);
      titleInput.value = '';
      priorityInput.value = 'medium';
      this.feedback.set('Tâche ajoutée.');
      titleInput.focus();
    } catch (error) {
      this.feedback.set(error instanceof Error ? error.message : 'Impossible d’ajouter la tâche.');
    }
  }

  protected setQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected setFilter(filter: TodoFilter): void {
    this.filter.set(filter);
  }

  protected toggleTodo(id: string): void {
    this.store.toggle(id);
  }

  protected deleteTodo(id: string): void {
    this.store.remove(id);
    this.feedback.set('Tâche supprimée.');
  }

  protected clearCompleted(): void {
    this.store.clearCompleted();
    this.feedback.set('Tâches terminées effacées.');
  }

  protected priorityLabel(priority: TodoPriority): string {
    return { high: 'Haute', medium: 'Normale', low: 'Basse' }[priority];
  }
}
