---
skill_id: material-ui-basics
title: Material UI Basics
level: core
semester_stage: early
prerequisites:
  - react-foundations
artifacts:
  - mui-component
  - styled-layout
  - comparison-note
---

# Material UI Basics

## Intent
Build interfaces using Material UI components and styling patterns instead of ad hoc HTML and CSS alone.

## When to use
Use when the UI should follow a component-based design system with cards, tables, grid layout, app bars, drawers, chips, or typography.

## When not to use
Do not use when the task is explicitly about raw CSS or framework-agnostic HTML only.

## Inputs expected
UI requirements, chosen Material UI components, and any custom styles.

## Outputs produced
A Material UI-based component or page with consistent styling.

## Constraints
Prefer Material UI components over reinventing equivalents. Use sx or style consistently.

## Required practices
Use relevant MUI primitives, retain readability, and avoid overly deep nesting of wrappers.

## Process
1. Identify which UI blocks map naturally to MUI components.
2. Replace raw HTML sections with appropriate MUI components.
3. Add layout using Grid, Box, Paper, or similar wrappers.
4. Apply light custom styles with sx or style objects.
5. Check responsiveness and readability.

## Code pattern
```tsx
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const MovieSummary = ({ title, overview }: { title: string; overview: string }) => (
  <Card>
    <CardContent>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body1">{overview}</Typography>
    </CardContent>
  </Card>
);
```

## Common mistakes
- Using MUI but keeping old HTML structures that duplicate it.
- Mixing incompatible styling approaches randomly.
- Ignoring responsive layout.
- Using MUI components without understanding their roles.

## Evaluation checks
- Does the UI use appropriate MUI components?
- Is styling consistent?
- Is layout clear on different viewport sizes?
- Is the result simpler than a custom CSS-heavy version?

## Student-readable explanation
This skill gives students a reusable design system and supports later labs involving cards, tables, navigation, drawers, and forms.

## Extension ideas
- Add Drawer-based filter UI.
- Create an AppBar header.
- Refactor a Bootstrap component into MUI.
