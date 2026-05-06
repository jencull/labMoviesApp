---
skill_id: parallel-queries-cache-identity
title: Parallel Queries and Cache Identity
level: core
semester_stage: late
prerequisites:
  - server-state-caching
  - context-shared-state
artifacts:
  - useQueries-page
  - query-key-design-note
  - favourites-data-page
---

# Parallel Queries and Cache Identity

## Intent
Fetch multiple related server-state records in parallel and design cache keys that reflect identity clearly.

## When to use
Use when a list of IDs must be turned into multiple cached detail requests, such as favourites stored as movie IDs.

## When not to use
Do not use when one backend endpoint already returns the whole collection cleanly.

## Inputs expected
An array of entity IDs, query function, and cache key pattern.

## Outputs produced
A page using useQueries and stable key design.

## Constraints
Keep query keys serializable and identity-based. Avoid redundant fetches where cached entries already exist.

## Required practices
Use useQueries for parallel detail fetches and explain why array keys such as ['movie', id] matter.

## Process
1. Identify the list of IDs to resolve.
2. Create one query config per ID.
3. Run them with useQueries.
4. Handle loading or partially loaded states.
5. Render the collected results after queries complete.

## Code pattern
```tsx
const favouriteMovieQueries = useQueries(
  movieIds.map((movieId) => ({
    queryKey: ["movie", movieId],
    queryFn: () => getMovie(movieId.toString()),
  }))
);
```

## Common mistakes
- Using unclear string keys for parameterised data.
- Not checking loading state across multiple queries.
- Fetching the same entity under different keys.
- Confusing cache identity with display labels.

## Evaluation checks
- Do query keys reflect entity identity?
- Can existing cached movie entries be reused?
- Is the parallel query flow understandable?
- Is the loading path handled?

## Student-readable explanation
This skill deepens the caching work in Lab 4. It is especially useful for favourites pages built from shared IDs rather than from a single list endpoint.

## Extension ideas
- Add upcoming movies with a separate cache key.
- Explain stale vs fresh entries.
- Compare fetching full objects directly from context vs by ID.
