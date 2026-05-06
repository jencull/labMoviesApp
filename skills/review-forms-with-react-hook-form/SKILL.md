---
skill_id: review-forms-react-hook-form
title: Review Forms with react-hook-form
level: core
semester_stage: late
prerequisites:
  - material-ui-basics
  - context-shared-state
artifacts:
  - validated-form
  - controller-fields
  - submission-flow
---

# Review Forms with react-hook-form

## Intent
Build a structured review form with validation, controlled inputs, submit handling, reset behaviour, and feedback UI.

## When to use
Use when the app needs a user input form with validation and a predictable submit workflow.

## When not to use
Do not use for a trivial single input where plain local state is clearer.

## Inputs expected
Form fields, validation rules, submit destination, and any success feedback flow.

## Outputs produced
A working validated form component and submission behaviour.

## Constraints
Use react-hook-form to reduce manual boilerplate. Keep validation rules readable.

## Required practices
Use useForm and Controller where appropriate, show validation errors, and handle submit/reset paths clearly.

## Process
1. Define the shape of the form data.
2. Create the form with useForm default values.
3. Wrap fields in Controller components where useful.
4. Declare validation rules and render error messages.
5. Handle successful submission and user feedback.

## Code pattern
```tsx
const { control, handleSubmit, formState: { errors }, reset } = useForm<Review>();

<Controller
  name="author"
  control={control}
  rules={{ required: "Name is required" }}
  render={({ field }) => <TextField {...field} label="Author" />}
/>
```

## Common mistakes
- Mixing manual field state with react-hook-form unnecessarily.
- Not surfacing validation messages.
- Using vague form data types.
- Skipping success acknowledgement.

## Evaluation checks
- Are fields validated?
- Does submit capture the expected review data?
- Can the user reset the form?
- Is the feedback flow clear?

## Student-readable explanation
This skill completes the movie app by enabling user-authored reviews. It also introduces a realistic form-handling library and validation workflow.

## Extension ideas
- Persist reviews to an API later.
- Add checkbox or rating validation.
- Compare Controller-based fields with register-based fields.
