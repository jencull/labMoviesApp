---
skill_id: openapi-type-layer
title: OpenAPI Type Layer
level: core
semester_stage: middle
prerequisites:
  - api-fetching
artifacts:
  - generated-types
  - local-type-layer
  - typed-component-props
---

# OpenAPI Type Layer

## Intent
Generate API types from an OpenAPI specification and build a smaller local type layer for the app.

## When to use
Use when the API provides an OpenAPI schema and the app should remain strongly typed without duplicating backend models by hand.

## When not to use
Do not use when the API has no schema and the task only needs a one-off ad hoc type.

## Inputs expected
OpenAPI spec file, generator command, and the endpoint paths actually used by the app.

## Outputs produced
Generated API types plus app-specific extracted aliases and prop types.

## Constraints
Treat the generated types as source material, then create a cleaner app-facing type layer on top.

## Required practices
Generate types once, reference exact path-based types, and keep local aliases readable.

## Process
1. Save the OpenAPI schema into the project.
2. Generate TypeScript types from it.
3. Inspect the generated paths or components.
4. Create smaller aliases for the endpoints used in the app.
5. Use those aliases in components and API helpers.

## Code pattern
```ts
import { paths } from "./generated/tmdb";

export type DiscoverMoviesProps =
  paths["/3/discover/movie"]["get"]["responses"][200]["content"]["application/json"];

export type DiscoverMovieOverviewProps =
  NonNullable<DiscoverMoviesProps["results"]>[number];
```

## Common mistakes
- Using the huge generated file directly everywhere.
- Copying API types manually instead of extracting them.
- Ignoring optional or nullable fields.
- Losing the connection between endpoint and app type.

## Evaluation checks
- Are types derived from the OpenAPI source?
- Is there a readable local layer?
- Are nullable fields handled thoughtfully?
- Would updating the schema be manageable?

## Student-readable explanation
This skill creates strong typing without duplication. It is especially useful in the movie labs because most data shape comes from the TMDB API.

## Extension ideas
- Add type aliases for reviews and genre responses.
- Compare generated types with hand-written ones.
- Use the type layer in form or cache code.
