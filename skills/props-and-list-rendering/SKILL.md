---
skill_id: props-list-rendering
title: Props and List Rendering
level: core
semester_stage: early
prerequisites:
  - react-foundations
artifacts:
  - reusable-component
  - typed-props
  - usage-example
---

# Props and List Rendering

## Intent
Turn fixed UI into reusable components that receive data through props and render variable-length collections.

## When to use
Use when the same UI structure should display different data, especially tables, cards, or repeated rows.

## When not to use
Do not use when the main challenge is shared state, routing, or server communication.

## Inputs expected
A component structure, prop names, and one or more arrays or records to render.

## Outputs produced
A typed reusable component and example usage.

## Constraints
Prefer explicit prop types, avoid hard-coded indexes, and use map for repeated data.

## Required practices
Use TypeScript types for props, stable keys where available, and readable prop names.

## Process
1. List the values currently hard-coded in the component.
2. Move those values into props.
3. Create a type or interface for the props.
4. Use array mapping for repeated UI.
5. Render the component from a parent with sample data.

## Code pattern
```tsx
type Module = {
  name: string;
  noLectures: number;
  noPracticals: number;
};

type CourseModulesProps = {
  course: string;
  modules: Module[];
};

const CourseModules = ({ course, modules }: CourseModulesProps) => {
  return (
    <div>
      <h1>{course}</h1>
      <table className="table table-bordered">
        <tbody>
          {modules.map((module) => (
            <tr key={module.name}>
              <td>{module.name}</td>
              <td>{module.noLectures}</td>
              <td>{module.noPracticals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

## Common mistakes
- Using modules[0] and modules[1] instead of iteration.
- Forgetting prop typing.
- Using weak or unstable keys when a better key exists.
- Mixing data definition into the reusable component.

## Evaluation checks
- Can it render arrays of different sizes?
- Are props typed?
- Is the repeated UI generated with map?
- Is the component more reusable than the static version?

## Student-readable explanation
This skill separates data from presentation. It is central to React because reusable components nearly always depend on props and list rendering.

## Extension ideas
- Add conditional rendering for empty arrays.
- Extract a row component.
- Use the same component with a different dataset.
