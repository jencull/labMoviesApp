---
skill_id: server-state-caching
title: Server-State Caching
level: core
semester_stage: late
prerequisites:
  - api-fetching
  - custom-hooks
artifacts:
  - react-query-page
  - query-provider-setup
  - cache-key-plan
---

# Server-State Caching

## Intent
Manage remote API data as server state using react-query so repeated mounts reuse cached data.

## When to use
Use when data comes from an API, changes less frequently than local UI state, and should not refetch on every remount.

## When not to use
Do not use for tiny local-only state such as drawer open/closed or form text before submit.

## Inputs expected
Query function, query key, and cache configuration.

## Outputs produced
A page or component using useQuery with loading and error states.

## Constraints
Choose stable query keys. Do not confuse cache state with UI state.

## Required practices
Wrap the app in QueryClientProvider, use useQuery or useQueries, and render loading/error states explicitly.

## Process
1. Set up a QueryClient and provider near the app root.
2. Identify data that should live in the server-state cache.
3. Write a query function that returns parsed data or throws an error.
4. Choose a query key that uniquely identifies that data.
5. Use useQuery or useQueries and render from the cached result.

## Code pattern
```tsx
const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
  "discover",
  getMovies
);

if (isLoading) return <Spinner />;
if (isError) return <h1>{error.message}</h1>;
```

## Common mistakes
- Using react-query for basic local toggles.
- Choosing vague or unstable query keys.
- Ignoring loading and error states.
- Leaving fetch helpers to return inconsistent shapes.

## Evaluation checks
- Is the provider set up?
- Is the query key sensible?
- Would repeated navigation avoid redundant fetches?
- Can the student explain why this is server state?

## Student-readable explanation
This skill is a major Lab 4 addition. It improves performance and models API data more accurately than plain useEffect-based fetching.

## Extension ideas
- Use array query keys for parameterised data.
- Show staleTime reasoning.
- Compare useEffect fetching with react-query.
