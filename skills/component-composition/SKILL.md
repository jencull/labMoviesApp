---
skill_id: component-composition
title: Component Composition
level: core
semester_stage: late-middle
prerequisites:
  - refactoring-for-reuse
artifacts:
  - container-component
  - children-based-template
  - composed-page
---

# Component Composition

## Intent
Reuse a page layout by injecting different child content into a shared container component.

## When to use
Use when multiple pages share the same outer structure but differ in the main content area, such as a details page and a review page.

## When not to use
Do not use when the pages are almost entirely different or when simple props are enough.

## Inputs expected
Shared page structure, page-specific content component, and the common data needed by the container.

## Outputs produced
A reusable template component using children.

## Constraints
Keep the container responsible for shared layout only. Let children own their specific content.

## Required practices
Use props.children or a typed children prop, and explain what the container owns versus what the child contributes.

## Process
1. Identify the repeated outer layout shared by multiple pages.
2. Extract that layout into a template component.
3. Add a children prop for the variable content region.
4. Compose the template with different child components from each page.
5. Confirm that both pages reuse the structure cleanly.

## Code pattern
```tsx
interface TemplateMoviePageProps {
  movie: MovieDetailsProps;
  children: React.ReactElement;
}

const TemplateMoviePage = ({ movie, children }: TemplateMoviePageProps) => (
  <>
    <MovieHeader {...movie} />
    <Grid container spacing={5}>
      <Grid item xs={3}>{/* shared images */}</Grid>
      <Grid item xs={9}>{children}</Grid>
    </Grid>
  </>
);
```

## Common mistakes
- Putting page-specific logic back into the template.
- Not understanding that children is supplied by the consumer.
- Using composition where a simple prop would be clearer.
- Leaving the shared structure unclear.

## Evaluation checks
- Does the template truly remove duplication?
- Is the shared layout easy to identify?
- Can different child components plug in cleanly?
- Would a student understand how children is used?

## Student-readable explanation
This skill is one of the explicit new techniques in Movie App Part 3. It lets the app reuse the movie page layout for both details and review pages.

## Extension ideas
- Compose a form page into the same template.
- Add another child variant such as credits or similar movies.
- Compare composition with inheritance and explain why React prefers composition.
