---
skill_id: storybook-maintenance
title: Storybook Maintenance After Refactoring
level: core
semester_stage: late
prerequisites:
  - render-props-configurable-actions
  - context-shared-state
  - server-state-caching
artifacts:
  - updated-stories
  - decorator-setup
  - testing-note
---

# Storybook Maintenance After Refactoring

## Intent
Keep Storybook stories working after app refactors by adding the providers and wrappers components now depend on.

## When to use
Use when components that previously rendered alone now require router, context, or query providers to function.

## When not to use
Do not use when the task has no Storybook setup or component isolation requirement.

## Inputs expected
Broken stories, required providers, and sample args.

## Outputs produced
Updated Storybook stories with appropriate decorators.

## Constraints
Add only the wrappers the story needs. Keep stories focused on the component behaviour being demonstrated.

## Required practices
Use decorators for providers such as router, context, and query client when required.

## Process
1. Identify why the story broke after refactoring.
2. List the wrappers the component now expects in the app.
3. Add Storybook decorators for those wrappers.
4. Pass realistic sample args.
5. Run the stories and verify they render again.

## Code pattern
```tsx
decorators: [
  (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
]
```

## Common mistakes
- Assuming isolated stories still work after adding routing or context dependencies.
- Adding the wrong wrappers or too many wrappers.
- Forgetting sample data props.
- Treating story fixes as optional after refactor.

## Evaluation checks
- Do the stories render again?
- Are the required providers present?
- Is each decorator justified?
- Can the student explain why the story broke?

## Student-readable explanation
This skill helps students maintain component demos and tests after architectural changes. It reinforces that refactoring affects tooling, not just app runtime code.

## Extension ideas
- Add a QueryClient decorator.
- Write one story per action variant.
- Document common story breakages after refactors.
