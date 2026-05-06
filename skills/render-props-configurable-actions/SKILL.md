---
skill_id: render-props-configurable-actions
title: Render Props for Configurable Actions
level: core
semester_stage: late
prerequisites:
  - refactoring-for-reuse
  - context-shared-state
artifacts:
  - render-prop-component
  - configurable-card
  - page-specific-actions
---

# Render Props for Configurable Actions

## Intent
Allow a reusable component to render different action UI depending on the page using it.

## When to use
Use when one shared component structure needs different controls in different contexts, such as add favourite on one page and remove/review on another.

## When not to use
Do not use when a simple boolean prop or small enum would clearly be enough.

## Inputs expected
A shared component and a page-specific action renderer.

## Outputs produced
A reusable component with a render prop for actions.

## Constraints
Keep the render prop purpose narrow. Avoid turning the component into an unbounded template for everything.

## Required practices
Pass a function prop that returns React nodes, and call it where the configurable UI belongs.

## Process
1. Locate the hard-coded action area in the shared component.
2. Replace that hard-coded UI with a function prop.
3. Type the function prop clearly.
4. Provide different implementations from different pages.
5. Verify the shared component remains reusable.

## Code pattern
```tsx
interface MovieCardProps {
  movie: BaseMovieProps;
  action: (m: BaseMovieProps) => React.ReactNode;
}

const MovieCard = ({ movie, action }: MovieCardProps) => (
  <Card>
    <CardContent>{movie.title}</CardContent>
    <CardActions>{action(movie)}</CardActions>
  </Card>
);
```

## Common mistakes
- Using render props when a plain prop is simpler.
- Leaving page-specific logic inside the shared component.
- Not typing the function clearly.
- Making the function do too much.

## Evaluation checks
- Does the shared component still own the shared structure only?
- Do different pages inject different actions cleanly?
- Is the render prop easy to understand?
- Has duplication been reduced?

## Student-readable explanation
This skill solves the favourites-page bug in Lab 4 by making movie card actions page-dependent. It is a strong example of reusable React design.

## Extension ideas
- Use the same pattern for headers or empty states.
- Compare render props with component composition.
- Refactor one more configurable area using the same idea.
