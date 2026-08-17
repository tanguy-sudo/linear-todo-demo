# Instructions for coding agents

## Project

This is a dependency-free browser application. Keep the implementation in plain HTML, CSS, and modern JavaScript unless an issue explicitly requires another stack.

Tasks are stored in `localStorage`; do not add a backend or authentication for the demo without a dedicated issue.

## Workflow

- Read the complete Linear issue before editing.
- Reuse the existing modules and browser APIs before adding dependencies.
- Use a branch named `feature/<LINEAR-ID>-<short-description>` or `fix/<LINEAR-ID>-<short-description>`.
- Put the exact Linear issue ID in the pull request title and use a closing magic word such as `Fixes TEAM-123` in the description.
- Open a draft pull request for review. Do not merge it automatically.

## Verification

Run `npm test` and `npm run check` before opening a pull request. For UI changes, also serve the repository locally and check the desktop and mobile layouts.

## Scope

Keep changes focused on the issue. Do not commit secrets, generated dependencies, or unrelated formatting changes.
