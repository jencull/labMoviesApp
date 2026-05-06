---
skill_id: extended-link-routing-page-state
title: Extended Link Routing and Page State
level: core
semester_stage: late-middle
prerequisites:
  - routing-navigation
artifacts:
  - link-with-state
  - stateful-route
  - explanation-note
---

# Extended Link Routing and Page State

## Intent
Navigate between routes while passing additional state objects alongside the URL.

## When to use
Use when the destination page needs extra context that should travel with the navigation, such as a selected review object and its movie.

## When not to use
Do not use when the destination can derive everything cleanly from the URL or a global store.

## Inputs expected
A destination route, route state payload, and consuming page.

## Outputs produced
A Link using state and a page that reads it with useLocation.

## Constraints
Only pass state that makes sense for navigation. Do not hide essential identity that should be in the URL.

## Required practices
Use Link state intentionally and destructure location state carefully on the destination page.

## Process
1. Create the destination route.
2. Build the Link with a path and state payload.
3. Navigate to the route by clicking the Link.
4. Read the state using useLocation on the destination page.
5. Render the page using the passed-in objects.

## Code pattern
```tsx
<Link
  to={`/reviews/${review.id}`}
  state={{ review, movie }}
>
  Full Review
</Link>
```

## Common mistakes
- Passing too much state instead of using URL params or cache.
- Assuming state will exist in every navigation scenario.
- Confusing location state with component state.
- Not documenting what travels in the link.

## Evaluation checks
- Does the route receive the expected state?
- Could the destination still be explained clearly?
- Is the payload appropriate?
- Does the URL still express identity?

## Student-readable explanation
This skill is used in Part 3 for moving from review excerpts to full review pages. It complements parameterised routing with richer navigation context.

## Extension ideas
- Add guard logic if state is missing.
- Compare useLocation state with querying by ID.
- Pass a movie ID only and fetch on arrival instead.
