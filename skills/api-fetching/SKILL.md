---
skill_id: api-fetching
title: API Fetching and Endpoint Integration
level: core
semester_stage: middle
prerequisites:
  - state-and-effects
artifacts:
  - api-call
  - fetched-page
  - error-handling-note
---

# API Fetching and Endpoint Integration

## Intent
Retrieve live data from an external API and use it in React pages or components.

## When to use
Use when the UI depends on backend or third-party data such as movies, genres, reviews, or images.

## When not to use
Do not use when working only with local sample data or static mock content.

## Inputs expected
Endpoint URL or helper function, response shape, auth mechanism, and target component.

## Outputs produced
A working fetch flow with loading and error awareness.

## Constraints
Keep secrets in environment variables. Do not hard-code API keys into components.

## Required practices
Use fetch or API helpers correctly, parse the response structure, and keep key handling private.

## Process
1. Identify the endpoint and required parameters.
2. Retrieve any API key or environment configuration securely.
3. Make the request and parse the JSON response.
4. Store the data in state or pass it into a cache layer.
5. Render the result safely once the data arrives.

## Code pattern
```ts
export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((res) => res.json());
};
```

## Common mistakes
- Exposing API keys in code or GitHub.
- Ignoring nested response shapes like results.
- Fetching in multiple places without abstraction.
- Skipping error handling completely.

## Evaluation checks
- Is the endpoint correct?
- Is secret handling safe?
- Does the UI reflect the real response shape?
- Is the fetch logic in a sensible place?

## Student-readable explanation
This skill brings the app to life with real data. It supports movie discovery, details, genres, images, and reviews throughout the labs.

## Extension ideas
- Add better response validation.
- Refactor raw fetches into API helpers.
- Cache the result with react-query.
