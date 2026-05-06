---
skill_id: routing-navigation
title: Routing and Navigation
level: core
semester_stage: middle
prerequisites:
  - component-hierarchy-page-assembly
artifacts:
  - route-config
  - navigation-links
  - parameterised-page
---

# Routing and Navigation

## Intent
Add page-level navigation to a React SPA using react-router.

## When to use
Use when the app has multiple pages, parameterised URLs, or navigation links between views.

## When not to use
Do not use for a single static page with no navigation concerns.

## Inputs expected
A page list, URL structure, and any route parameters.

## Outputs produced
A routing configuration and navigable pages.

## Constraints
Keep URL patterns meaningful and consistent. Route config should remain readable.

## Required practices
Use BrowserRouter, Routes, Route, and Link or navigation helpers appropriately.

## Process
1. List the views the app must support.
2. Assign each view a path.
3. Create the route configuration near the top of the app.
4. Add links or navigation buttons to move between routes.
5. Use route parameters where page identity comes from the URL.

## Code pattern
```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/movies/:id" element={<MovieDetailsPage />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
</BrowserRouter>
```

## Common mistakes
- Placing route logic deep in unrelated components.
- Using plain anchors for internal app navigation.
- Forgetting fallback routing.
- Not explaining how parameterised routes work.

## Evaluation checks
- Can the user navigate between pages?
- Are route paths sensible?
- Does the route parameter drive page behaviour correctly?
- Could a student describe the routing table?

## Student-readable explanation
This skill turns a component collection into an app. It is essential for the movie details page, review pages, favourites page, and later navigation flows.

## Extension ideas
- Add a nested route.
- Use useNavigate for imperative navigation.
- Protect a route with context later.
