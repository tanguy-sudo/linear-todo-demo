import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('renders the Angular todo shell', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Une seule liste.');
    expect(fixture.nativeElement.querySelector('input[type="search"]')).toBeTruthy();
  });

  it('adds a todo through the form', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const title = element.querySelector<HTMLInputElement>('#todo-input');
    const form = element.querySelector<HTMLFormElement>('form');

    title!.value = 'Préparer la release';
    form!.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    expect(element.querySelector('.todo-title')?.textContent).toContain('Préparer la release');
  });
});
