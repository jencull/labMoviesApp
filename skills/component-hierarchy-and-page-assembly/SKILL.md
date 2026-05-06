---
skill_id: component-hierarchy-page-assembly
title: Component Hierarchy and Page Assembly
level: core
semester_stage: early
prerequisites:
  - react-foundations
  - props-list-rendering
artifacts:
  - page-component
  - component-tree-note
  - assembly-plan
---

# Component Hierarchy and Page Assembly

## Intent
Design a page by breaking it into components and assembling them into a clear parent-child hierarchy.

## When to use
Use when moving from isolated components to complete pages such as home pages, details pages, or list pages.

## When not to use
Do not use when the task is only a small isolated component change.

## Inputs expected
A page mock-up or screenshot, likely subcomponents, and expected data flow.

## Outputs produced
A page-level component plus a hierarchy description.

## Constraints
Keep ownership clear. Parent components should coordinate layout and delegate rendering to children.

## Required practices
Name components by responsibility, assemble them in a readable hierarchy, and keep page composition explicit.

## Process
1. Sketch the page as a component tree.
2. Decide which components are reusable and which are page-specific.
3. Build child components first where helpful.
4. Compose the page from those child components.
5. Check that data flows in one understandable direction.

## Code pattern
```tsx
const HomePage = ({ movies }: { movies: Movie[] }) => {
  return (
    <>
      <Header title="Home Page" />
      <MovieList movies={movies} />
    </>
  );
};
```

## Common mistakes
- Creating page components that also implement every child inline.
- Unclear ownership of layout vs content.
- Over-fragmenting very small components.
- Ignoring the hierarchy in explanations.

## Evaluation checks
- Is the hierarchy easy to describe?
- Do parents and children have clear responsibilities?
- Could a student trace the rendering flow?
- Is the page assembled from sensible subcomponents?

## Student-readable explanation
This skill helps students think in React rather than writing a monolithic page. It supports later work on templates, composition, and routing.

## Extension ideas
- Turn a page into a reusable template.
- Add responsive grid layout.
- Document the hierarchy as a small diagram.
