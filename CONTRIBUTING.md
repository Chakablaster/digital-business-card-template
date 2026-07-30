# Contributing

Thank you for contributing to the Digital Business Card Template.

## Before You Start

Please check the existing issues and pull requests before opening a new one.

For larger changes, open an issue first so the proposed approach can be discussed before implementation begins.

## Requirements

- Node.js 24
- npm
- Git

The required Node.js version is also defined in `.nvmrc`.

## Local Setup

1. Fork the repository.
2. Clone your fork.
3. Install dependencies with `npm install`.
4. Start the development server with `npm run dev`.

## Project Checks

Before submitting a pull request, run:

- `npm test`
- `npm run lint`
- `npm run build`

All three commands must pass.

## Development Guidelines

- Keep user-editable content inside `src/config/card.config.ts`.
- Keep reusable card behaviour inside `src/features/digital-card`.
- Do not add personal information, branding, or deployment-specific URLs to the default template.
- Preserve accessibility behaviour, including keyboard navigation and visible focus states.
- Add or update tests when changing behaviour.
- Avoid unnecessary dependencies.
- Do not disable lint rules to hide implementation problems.
- Use Tailwind CSS v4 canonical syntax.
- Keep changes focused on one purpose.

## Commit Messages

Use Conventional Commit prefixes:

- `feat:` for a new user-facing feature
- `fix:` for corrected behaviour
- `docs:` for documentation changes
- `test:` for automated test changes
- `refactor:` for restructuring without behaviour changes
- `chore:` for tooling or repository maintenance

Write commit messages in the imperative mood and keep them specific.

## Pull Requests

A pull request should:

- Explain what changed and why.
- Reference the related issue when applicable.
- Include screenshots for visible interface changes.
- Include tests for new or changed behaviour.
- Avoid unrelated formatting or refactoring.
- Pass tests, linting, and the production build.

## Reporting Bugs

Use the bug report issue template and include:

- Steps to reproduce the problem
- Expected behaviour
- Actual behaviour
- Browser and operating system
- Relevant screenshots or console output

## Feature Requests

Use the feature request issue template and explain:

- The problem being solved
- The proposed behaviour
- Why it belongs in the reusable template
- Any accessibility or configuration impact
