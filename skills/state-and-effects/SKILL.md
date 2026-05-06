---
skill_id: state-and-effects
title: State and Effects
level: core
semester_stage: middle
prerequisites:
  - react-foundations
artifacts:
  - stateful-component
  - effect-driven-fetch
  - explanation-note
---

# State and Effects

## Intent
Manage changing UI state and side effects using useState and useEffect.

## When to use
Use when a component needs to react to user input, load data on mount, or re-run logic when dependencies change.

## When not to use
Do not use when the UI is fully static or when a dedicated server-state tool like react-query is the better fit.

## Inputs expected
State variables, default values, and triggers for when effects should run.

## Outputs produced
A stateful component with clear effect logic.

## Constraints
Keep effects focused. Avoid doing unrelated work in one effect. Respect dependency arrays.

## Required practices
Use useState for local state, useEffect for side effects, and explain why the effect depends on specific values.

## Process
1. Identify what data changes over time.
2. Create state variables with sensible defaults.
3. Add an effect for external or lifecycle-like work.
4. Specify the dependency array intentionally.
5. Render loading, empty, or updated UI states as needed.

## Code pattern
```tsx
const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies().then((results) => setMovies(results));
  }, []);

  return <MovieList movies={movies} />;
};
```

## Common mistakes
- Putting derived UI state into separate state unnecessarily.
- Forgetting dependency reasoning.
- Creating effects that run too often.
- Mixing fetch code, filtering code, and UI logic without structure.

## Evaluation checks
- Is each state variable necessary?
- Is each effect purposeful?
- Would the dependency array make sense to another student?
- Does the component handle the initial render safely?

## Student-readable explanation
This skill introduces dynamic behaviour in React and underpins live API data, drawers, and user interaction before caching abstractions are added.

## Extension ideas
- Split one effect into two clearer effects.
- Move effect logic to an API helper.
- Compare local state and server state.
