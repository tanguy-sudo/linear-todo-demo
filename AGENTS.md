# Instructions for coding agents

## Project

This is an Angular standalone application using TypeScript. Reuse Angular signals, components, browser APIs, and the existing todo domain before adding dependencies.

Tasks are stored in `localStorage`; do not add a backend or authentication for the demo without a dedicated issue.

## Workflow

- Read the complete Linear issue before editing.
- Reuse the existing modules and browser APIs before adding dependencies.
- Use a branch named `feature/<LINEAR-ID>-<short-description>` or `fix/<LINEAR-ID>-<short-description>`.
- Put the exact Linear issue ID in the pull request title and use a closing magic word such as `Fixes TEAM-123` in the description.
- Open a draft pull request for review. Do not merge it automatically.

## Verification

Run `npm run lint`, `npm test`, and `npm run build` before opening a pull request. For UI changes, also run `npm start` and check the desktop and mobile layouts.

The production output is `dist/linear-todo-demo/browser`; keep GitHub Pages pointed at that directory.

## Scope

Keep changes focused on the issue. Do not commit secrets, generated dependencies, or unrelated formatting changes.
