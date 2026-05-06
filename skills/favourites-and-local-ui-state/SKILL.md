---
skill_id: favourites-local-ui-state
title: Favourites and Local UI State
level: core
semester_stage: middle
prerequisites:
  - filtering-data-flow
artifacts:
  - interactive-card
  - toggle-flow
  - state-update-note
---

# Favourites and Local UI State

## Intent
Track user-specific UI selections such as favourite movies and reflect them in the interface.

## When to use
Use when clicking a control should mark an item locally, change card appearance, or create a selected subset.

## When not to use
Do not use when the state should already be globally shared via context or stored on the server.

## Inputs expected
A collection with item IDs, a user action, and a visible state change such as an icon.

## Outputs produced
Updated state and changed UI reflecting user selection.

## Constraints
Treat state immutably. Update arrays with map, filter, or context functions rather than mutation.

## Required practices
Use item IDs or clear identity, and keep the UI cue aligned with the state value.

## Process
1. Decide how favourites or selections will be represented.
2. Create a function that updates state immutably for the selected item.
3. Pass the action to the interactive child component.
4. Use the state to render the appropriate icon or marker.

## Code pattern
```tsx
const addToFavourites = (movieId: number) => {
  const updatedMovies = movies.map((m) =>
    m.id === movieId ? { ...m, favourite: true } : m
  );
  setMovies(updatedMovies);
};
```

## Common mistakes
- Mutating objects directly.
- Losing selections when the component remounts without understanding why.
- Not tying visual feedback to state.
- Using array indexes instead of stable identities.

## Evaluation checks
- Is the update immutable?
- Does the UI show the favourite state clearly?
- Can the student explain where the state lives?
- Is the limitation of local-only state understood?

## Student-readable explanation
This skill introduces app interaction before global sharing is added. It also exposes the limitations of page-local state, which motivates context in Lab 4.

## Extension ideas
- Persist to localStorage temporarily.
- Promote the feature into Context.
- Add remove-from-favourites support.
