---
skill_id: context-shared-state
title: Context for Shared State
level: core
semester_stage: late
prerequisites:
  - favourites-local-ui-state
  - routing-navigation
artifacts:
  - context-provider
  - consumer-component
  - shared-state-plan
---

# Context for Shared State

## Intent
Share app-wide data and actions across many components without prop drilling.

## When to use
Use when several pages or deeply nested components need the same data, such as favourites or review actions.

## When not to use
Do not use for state used by only one small branch of the tree.

## Inputs expected
Shared state shape, update functions, and the components that need access.

## Outputs produced
A context object, provider component, and consuming components.

## Constraints
Keep context focused. Do not put every piece of state into one global context by default.

## Required practices
Define the interface, initial state, provider, and useContext consumption points clearly.

## Process
1. Identify the state and actions used in multiple places.
2. Create a context interface and initial state.
3. Build a provider component that owns the shared state.
4. Wrap the relevant app subtree with the provider.
5. Consume the context in components that need the shared values.

## Code pattern
```tsx
export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  return (
    <MoviesContext.Provider value={{ favourites, addToFavourites, removeFromFavourites }}>
      {children}
    </MoviesContext.Provider>
  );
};
```

## Common mistakes
- Using context before proving the state is shared.
- Putting unrelated concerns into one provider.
- Forgetting to wrap consumers in the provider.
- Confusing context with caching.

## Evaluation checks
- Does the shared state solve a real prop-drilling problem?
- Are provider and consumer roles clear?
- Can multiple pages access the same state?
- Is context separate from server-state caching?

## Student-readable explanation
This skill fixes the limitations of local favourites state by making shared movie selections available across the app. It is a key Lab 4 design change.

## Extension ideas
- Add a must-watch list.
- Split large context into smaller contexts.
- Persist shared state later if needed.
