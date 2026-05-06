---
skill_id: responsive-site-header
title: Responsive Site Header
level: core
semester_stage: late-middle
prerequisites:
  - material-ui-basics
  - routing-navigation
artifacts:
  - appbar-header
  - responsive-menu
  - navigation-component
---

# Responsive Site Header

## Intent
Create a site-wide header that adapts between desktop navigation and mobile menu layouts.

## When to use
Use when the app needs a permanent site header with navigation options that should behave well across screen sizes.

## When not to use
Do not use when the interface is a single page or responsiveness is not relevant.

## Inputs expected
Navigation items, branding text, and viewport behaviour requirements.

## Outputs produced
An AppBar-based header with responsive menu behaviour.

## Constraints
Keep navigation items consistent across both desktop and mobile variants.

## Required practices
Use AppBar/Toolbar, route navigation, and a responsive breakpoint check such as useMediaQuery.

## Process
1. Define the menu options and their routes.
2. Build a desktop navigation variant.
3. Build a compact menu variant for smaller screens.
4. Switch between them using a media query.
5. Mount the header once near the top of the app.

## Code pattern
```tsx
const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

return (
  <AppBar position="fixed">
    <Toolbar>
      {isMobile ? <MobileMenu /> : <DesktopLinks />}
    </Toolbar>
  </AppBar>
);
```

## Common mistakes
- Duplicating navigation definitions in multiple places.
- Ignoring breakpoint logic.
- Making the header page-specific when it should be global.
- Not testing the compact menu flow.

## Evaluation checks
- Does navigation work on desktop and mobile widths?
- Is the header reusable across pages?
- Are menu options consistent?
- Is the responsiveness explained clearly?

## Student-readable explanation
This skill comes from Movie App Part 3 and shows students how UI structure, navigation, and responsiveness meet in a reusable site component.

## Extension ideas
- Add active link highlighting.
- Move menu options into data.
- Add user menu or theme toggle later.
