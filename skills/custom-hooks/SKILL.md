---
skill_id: custom-hooks
title: Custom Hooks
level: core
semester_stage: late-middle
prerequisites:
  - state-and-effects
  - api-fetching
artifacts:
  - custom-hook
  - refactored-page
  - logic-extraction-note
---

# Custom Hooks

## Intent
Extract reusable stateful logic from components into a custom hook.

## When to use
Use when multiple components share the same state/effect logic or when a component becomes easier to read if data logic is moved out.

## When not to use
Do not use for one-line wrappers that add no clarity.

## Inputs expected
A repeated or cluttered block of state/effect logic and the parameters it depends on.

## Outputs produced
A reusable hook and a cleaner consuming component.

## Constraints
Custom hooks should encapsulate logic, not UI. Keep the API of the hook small and clear.

## Required practices
Name the hook with a use prefix, return a clear shape, and keep the consuming component simpler than before.

## Process
1. Find state and effect logic that belongs together.
2. Move it into a function named with use...
3. Pass in the values that the logic depends on.
4. Return the state or helpers that consuming components need.
5. Replace the old in-component logic with the hook call.

## Code pattern
```ts
const useMovie = (id: string) => {
  const [movie, setMovie] = useState<MovieDetailsProps>();

  useEffect(() => {
    getMovie(id).then((result) => setMovie(result));
  }, [id]);

  return [movie, setMovie] as const;
};
```

## Common mistakes
- Moving JSX into the hook.
- Returning an unclear tuple or object without explanation.
- Creating a hook that is used only once and not clearer.
- Forgetting hook dependency reasoning.

## Evaluation checks
- Is the component cleaner after extraction?
- Does the hook own related logic only?
- Is the hook interface understandable?
- Could the hook be reused elsewhere?

## Student-readable explanation
This skill is explicitly introduced in Movie App Part 3. It helps students separate behaviour from rendering and prepares them for more advanced abstractions like generic filtering hooks.

## Extension ideas
- Return an object instead of a tuple and compare trade-offs.
- Create a hook for filtering state.
- Adapt the hook to work with react-query later.
