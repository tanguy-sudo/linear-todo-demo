import { createTodo, getProgress, removeCompleted, visibleTodos } from './todo';

describe('todo domain', () => {
  it('normalizes and validates a todo', () => {
    expect(createTodo('  Acheter du café  ', 'high', '1')).toEqual({
      id: '1',
      title: 'Acheter du café',
      priority: 'high',
      completed: false,
    });
    expect(() => createTodo('   ')).toThrow('Le titre est obligatoire.');
  });

  it('combines a case-insensitive query with status filters', () => {
    const todos = [
      createTodo('Préparer la démo', 'high', '1'),
      { ...createTodo('Répondre aux mails', 'low', '2'), completed: true },
    ];

    expect(visibleTodos(todos, 'all', 'MAILS').map((todo) => todo.id)).toEqual(['2']);
    expect(visibleTodos(todos, 'done', 'MAILS').map((todo) => todo.id)).toEqual(['2']);
    expect(visibleTodos(todos, 'open', 'MAILS')).toEqual([]);
    expect(removeCompleted(todos).map((todo) => todo.id)).toEqual(['1']);
  });

  it('calculates progress', () => {
    const todos = [
      createTodo('Une', 'medium', '1'),
      { ...createTodo('Deux', 'medium', '2'), completed: true },
      { ...createTodo('Trois', 'medium', '3'), completed: true },
    ];

    expect(getProgress(todos)).toEqual({ total: 3, completed: 2, percentage: 67 });
  });
});
