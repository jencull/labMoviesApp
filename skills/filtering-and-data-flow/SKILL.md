---
skill_id: filtering-data-flow
title: Filtering and Data Flow
level: core
semester_stage: middle
prerequisites:
  - state-and-effects
  - props-list-rendering
artifacts:
  - filter-ui
  - parent-state-flow
  - callback-pattern
---

# Filtering and Data Flow

## Intent
Implement filtering using parent-owned state and callbacks from child components.

## When to use
Use when user inputs like search text or dropdowns should control the displayed subset of a collection.

## When not to use
Do not use when the filtering belongs entirely to a backend query or when there is no user-controlled filtering.

## Inputs expected
Collection data, filter criteria, filter UI controls, and parent/child responsibilities.

## Outputs produced
A filtered list flow with state in the parent and events coming up from the child.

## Constraints
Store filter values in the nearest sensible parent. Keep child filter UI focused on input capture.

## Required practices
Use data down, action up. Derive the displayed list from filter state rather than mutating the source list.

## Process
1. Define the filter values that the page needs.
2. Store them in the parent component.
3. Pass current filter values to the filter UI child.
4. Pass a callback down so the child can report changes up.
5. Derive the displayed collection by filtering the source data.

## Code pattern
```tsx
const handleChange = (type: FilterOption, value: string) => {
  if (type === "title") setTitleFilter(value);
  else setGenreFilter(value);
};

<FilterCard
  onUserInput={handleChange}
  titleFilter={titleFilter}
  genreFilter={genreFilter}
/>
```

## Common mistakes
- Letting the child own state that the parent needs for display.
- Mutating the original movies array.
- Mixing filter UI with unrelated page logic.
- Not distinguishing source data from displayed data.

## Evaluation checks
- Does the parent own the filter state?
- Does the child emit changes via callbacks?
- Is the displayed list derived, not stored separately without need?
- Can the user combine filters?

## Student-readable explanation
This skill captures the core React pattern often described as data down, action up. It is central to the filtering drawers in the movie app.

## Extension ideas
- Move filtering logic into a custom hook.
- Reuse the same filter UI on another page.
- Support different filter combinations.
