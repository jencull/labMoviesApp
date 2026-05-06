---
skill_id: vite-project-setup
title: Vite Project Setup and Workflow
level: core
semester_stage: early
prerequisites:
  - none
artifacts:
  - project-scaffold
  - config-file
  - workflow-note
---

# Vite Project Setup and Workflow

## Intent
Create and manage a React + TypeScript project using Vite, including development, build, and preview workflows.

## When to use
Use when starting a new project, standardising the dev workflow, or explaining how a React app is scaffolded and served.

## When not to use
Do not use when the project already exists and the task is purely feature development inside components.

## Inputs expected
Project name, required framework stack, and any local config such as development port.

## Outputs produced
A working Vite app scaffold and a short note explaining dev/build commands.

## Constraints
Keep the generated setup conventional. Do not over-customise config unless the task requires it.

## Required practices
Use React + TypeScript, document install/dev/build/preview commands, and respect .gitignore for generated output.

## Process
1. Scaffold the project with Vite.
2. Install dependencies.
3. Set development configuration if needed.
4. Run the dev server and confirm hot reload works.
5. Build and preview the production output.

## Code pattern
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
```

## Common mistakes
- Committing node_modules or dist.
- Not explaining the difference between dev and build.
- Treating Vite-specific env handling as generic browser JavaScript.
- Skipping the preview step.

## Evaluation checks
- Can the project run locally?
- Is the config minimal and correct?
- Are the commands documented?
- Does the student understand HMR vs production build?

## Student-readable explanation
This skill establishes the development environment. Students need it so later component, routing, and data work sits inside a standard React toolchain.

## Extension ideas
- Add alias config.
- Explain environment variables.
- Compare dev server and preview behaviour.
