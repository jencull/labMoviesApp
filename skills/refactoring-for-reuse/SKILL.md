---
skill_id: refactoring-for-reuse
title: Refactoring for Reuse
level: core
semester_stage: middle
prerequisites:
  - component-hierarchy-page-assembly
  - favourites-local-ui-state
artifacts:
  - template-component
  - refactor-note
  - before-after-comparison
---

# Refactoring for Reuse

## Intent
Remove duplication and improve maintainability by extracting reusable structures and shared code.

## When to use
Use when two pages or components are mostly the same, or when code is becoming harder to maintain because of duplication.

## When not to use
Do not refactor prematurely if there is only one clear use and no duplication yet.

## Inputs expected
Two similar components or repeated logic blocks.

## Outputs produced
A cleaner reusable component, helper, or template.

## Constraints
Refactor only after identifying real duplication. Keep the extracted abstraction understandable to students.

## Required practices
Preserve behaviour, explain the reason for the refactor, and make the abstraction name meaningful.

## Process
1. Compare the repeated code and identify what is shared.
2. Separate shared structure from page-specific parts.
3. Extract the shared structure into a reusable template or helper.
4. Replace old duplicated code with the new abstraction.
5. Verify behaviour remains the same.

## Code pattern
```tsx
<PageTemplate
  title="Favourite Movies"
  movies={movies}
  action={(movie) => <RemoveFromFavourites {...movie} />}
/>
```

## Common mistakes
- Refactoring before understanding the duplication.
- Creating an abstraction with a vague name.
- Making the abstraction so generic that it becomes harder to read.
- Changing behaviour accidentally during refactor.

## Evaluation checks
- Did duplication decrease?
- Is the new abstraction readable?
- Can both original use cases still work?
- Is the explanation of the refactor convincing?

## Student-readable explanation
This skill helps students move from getting code to work toward making it reusable. It is a bridge to templates, composition, render props, and custom hooks.

## Extension ideas
- Extract API functions into a module.
- Refactor filter logic into a hook.
- Document the refactor as a before/after diff.
