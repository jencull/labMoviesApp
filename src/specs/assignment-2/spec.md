# Assignment 2 Spec: Movies App Extension

**Output path:** `src/specs/assignment-2/spec.md`
**Baseline:** Completed Lab 4/5 solution in this repository
**Grade target:** Outstanding (90+)
**Submission deadline:** 17 May 2026

---

## Introduction / Overview

This spec describes the delta between the existing Lab 4/5 Movies app and the
completed Assignment 2 submission. It does not restate the baseline application.
Every feature is labelled by the grade tier it belongs to so implementation can
stop at any tier boundary and remain coherent and independently gradeable.

The primary goal is to extend the Movies app with a new TV Series entity, a
Fantasy Movie creator, authentication via the Assignment 1 backend, backend
persistence for reviews, and advanced UX features (pagination, ordered
favourites, playlists, multi-criteria search).

---

## Starting Point

The repo contains the completed Lab 4/5 solution with the following active
features:

- Vite + React + TypeScript, MUI 5 (sx prop, Emotion), React Router v6
- TMDB API via `src/api/tmdb-api.ts`; react-query v3 (`useQuery`, `useQueries`)
  with `staleTime: 360000`, `refetchInterval: 360000`, `refetchOnWindowFocus: false`
- Pages: Home (discover), Movie Details, Favourites, Upcoming Movies,
  Add Movie Review, Movie Review display
- `MovieCard` with render-prop `action` slot for configurable card actions
- `MoviesContext` managing `favourites[]`, `mustWatch[]`, `addReview()` stub
- `useFiltering` custom hook with composable title/genre predicates
- Template layout components: `TemplateMovieListPage`, `TemplateMoviePage`
- Review form using `react-hook-form`, submitting to context only
- OpenAPI-generated TMDB types in `src/types/generated/tmdb.ts`

### Known Incomplete Stubs (in-scope technical debt)

These must be addressed during implementation, not worked around:

| Stub | Location | What is broken |
|------|----------|----------------|
| Sort UI with no logic | `FilterMoviesCard.tsx` lines 99–106 | Card renders title + icon only, no controls |
| Placeholder nav links | `SiteHeader.tsx` lines 35–36 | "Option 3" and "Option 4" both route to `/` |
| `myReviews` not exposed | `moviesContext.tsx` line 31 | State exists but is not in the context value |
| `localStorage` favourites | `HeaderMovie.tsx` | Reads from `localStorage`, not `MoviesContext` |
| Dead `useMovie` hook | `src/hooks/useMovie.ts` | Not imported anywhere; either use or remove |

---

## Pre-Requisite: Assignment 1 Backend Fix

**This must be completed before any auth integration work can be tested in the
browser. It is a blocker for the Very Good tier and above.**

### Problem

Both APIs in the Assignment 1 repo use:

```typescript
defaultCorsPreflightOptions: {
  allowOrigins: apig.Cors.ALL_ORIGINS,  // resolves to "*"
}
```

The signin Lambda also returns `"Access-Control-Allow-Origin": "*"` in its
response headers. Browsers reject `*` when a request includes credentials,
which silently blocks all authenticated calls from the React app.

The Lambda authorizer reads from the `cookie` header:
```typescript
identitySources: [apig.IdentitySource.header("cookie")]
```

The signin Lambda already returns the JWT in the response body
(`{ message, token }`), so switching to Bearer token auth requires minimal
backend change and is the standard SPA pattern.

### Required Fix (Bearer Token Approach)

Apply the following changes to the **Assignment 1 repo** and run `cdk deploy`:

**1. `lib/constructs/app-api.ts` — change authorizer identity source:**
```typescript
// Before
identitySources: [apig.IdentitySource.header("cookie")]

// After
identitySources: [apig.IdentitySource.header("Authorization")]
```

**2. `lib/constructs/app-api.ts` — fix CORS:**
```typescript
defaultCorsPreflightOptions: {
  allowOrigins: ["http://localhost:5173"],
  allowCredentials: true,
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: apig.Cors.ALL_METHODS,
}
```

**3. `lib/constructs/auth-api.ts` — fix CORS (same change as above):**
```typescript
defaultCorsPreflightOptions: {
  allowOrigins: ["http://localhost:5173"],
  allowCredentials: true,
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: apig.Cors.ALL_METHODS,
}
```

**4. `lambda/auth/signin.ts` — fix hardcoded CORS header in response:**
```typescript
// Before
"Access-Control-Allow-Origin": "*"

// After
"Access-Control-Allow-Origin": "http://localhost:5173"
```

**5. Run `CDK_DOCKER=podman npx cdk deploy` (as per Assignment 1 student notes)**

After deployment, verify with:
```bash
curl -s -o /dev/null -D - -X OPTIONS \
  "$VITE_APP_API/movies/reviews" \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type,Authorization"
```
Expected: `access-control-allow-origin: http://localhost:5173` and
`access-control-allow-credentials: true` in the response headers.

---

## Assignment 1 API Surface

Two separate base URLs — both stored as environment variables in `.env`:

```
VITE_AUTH_API=https://<auth-id>.execute-api.eu-west-1.amazonaws.com/prod
VITE_APP_API=https://<app-id>.execute-api.eu-west-1.amazonaws.com/prod
```

### Auth API Endpoints

| Method | Path | Body | Notes |
|--------|------|------|-------|
| POST | `/auth/signup` | `{ username, password, email }` | Creates Cognito user |
| POST | `/auth/confirm-signup` | `{ username, code }` | Email verification |
| POST | `/auth/signin` | `{ username, password }` | Returns `{ token }` in body |
| GET | `/auth/signout` | — | Clears session |

### App API Endpoints

| Method | Path | Auth | Body / Params |
|--------|------|------|---------------|
| GET | `/movies/:movieID/reviews` | Public | Returns reviews array |
| GET | `/reviews?movie=:id&published=:date` | Public | LSI-filtered reviews |
| POST | `/movies/reviews` | Protected | `{ movieID, date, text }` |
| PUT | `/movies/:movieID/reviews` | Protected | `{ date, text }` |

### Auth Mechanism (post-fix)

All protected fetch calls must include:
```
Authorization: Bearer <token>
```

Frontend flow:
1. Call `POST /auth/signin` → read `data.token` from response body
2. Store token in `AuthContext` (and optionally `localStorage` for persistence)
3. Inject `Authorization: Bearer ${token}` in all `app-api.ts` fetch calls

### Backend Validation Notes

- `POST /movies/reviews` requires `Content-Length` header (API Gateway quirk)
- Only the original review author can update a review (enforced in Lambda)
- `movieID` must be a valid numeric TMDB ID
- `text` must be at least 1 character
- No Favourites or Fantasy Movie persistence endpoints exist — these are
  Outstanding tier and require new Lambda + CDK work

---

## Relevant Skills

| Skill File | Purpose |
|------------|---------|
| `skills/server-state-caching/SKILL.md` | `useQuery`, `useQueries`, `keepPreviousData` for pagination |
| `skills/context-for-shared-state/SKILL.md` | `MoviesContext`, new `AuthContext` patterns |
| `skills/render-props-configurable-actions/SKILL.md` | Card action slot for TV cards, playlist actions |
| `skills/review-forms-with-react-hook-form/SKILL.md` | Fantasy Movie form, Cast list form, Sign In form |
| `skills/api-fetching/SKILL.md` | `tmdb-api.ts` TV extensions, new `app-api.ts` wrapper |
| `skills/component-composition/SKILL.md` | `TemplateMoviePage` reuse for TV details |
| `skills/component-hierarchy-and-page-assembly/SKILL.md` | Page structure for TV, auth, playlist pages |

---

## Goals

1. Add TV Series as a fully navigable second entity, mirroring the movie
   pattern at page, component, API, and context level.
2. Implement the Fantasy Movie creator form (Basic and Advanced) using
   existing react-hook-form patterns.
3. Integrate the Assignment 1 backend for authentication and review
   persistence, with private/public route protection.
4. Add pagination, sorting, and multi-criteria search to improve UX on
   listing pages.
5. Implement Ordered Favourites and Themed Playlists as advanced state
   management features.
6. Ensure the app is coherent and gradeable at every tier boundary, with
   all baseline stubs resolved.

---

## User Stories

**As a visitor**, I want to browse and search TV series so that I can discover
content beyond movies without needing to sign in.

**As a visitor**, I want to navigate from a TV series in a list to its detail
page so that I can see full information with one click.

**As a signed-in user**, I want to add TV series to my favourites so that I can
keep track of shows I am interested in.

**As a signed-in user**, I want to create a Fantasy Movie record so that I can
save an idea for a film I would like to see made.

**As a signed-in user**, I want to write and submit a movie review so that my
review is saved to the database and visible after I refresh the page.

**As a signed-in user**, I want to reorder my favourite movies so that my most
important favourites appear at the top of my list.

**As a signed-in user**, I want to create a themed playlist of movies so that I
can group films by a common theme and share the idea.

**As a visitor**, I want to search movies by multiple criteria (year, rating,
language) so that I can find films matching specific requirements.

**As any user**, I want page navigation controls on long movie lists so that I
am not forced to load all results at once.

---

## In Scope

### Good Tier (40–50%)
- TV Series entity: Discover TV page, TV Details page, parameterised `/tv/:id` route
- Data hyperlinking from TV list cards to TV detail page
- New TMDB API functions for TV in `tmdb-api.ts`
- Sort fix: implement at least one working sort criterion in `FilterMoviesCard`
- Fantasy Movie (Basic): form with Title, Overview, Genres, Release Date,
  Runtime, Production Company(s) — stored in `MoviesContext`
- Resolve all baseline stubs listed in the Starting Point section

### Very Good Tier (50–70%)
- Extensive data hyperlinking (genres, actors where available)
- Pagination on at least one listing page using react-query `keepPreviousData`
- `PrivateRoute` wrapper protecting add-favourite, must-watch, fantasy movie creation
- Favourite TV Series (stored in `MoviesContext` alongside movie favourites)
- Multi-criteria Search form with MUI Select/Checkbox controls
- Sign In / Sign Up / Sign Out pages and flows via Assignment 1 Auth API
- `AuthContext` for token and user state across the app
- `app-api.ts` fetch wrapper with Bearer token injection

### Excellent Tier (70–90%)
- Ordered Favourites: drag-to-reorder or up/down controls on favourites list
- Themed Playlists: create/view playlists with Title, Theme, Movie list
- Fantasy Movie (Advanced): Cast list (role name + description per member),
  poster image selection or upload
- Persist movie reviews to Assignment 1 API (`POST /movies/reviews`) so they
  survive page refresh
- Expose `myReviews` from `MoviesContext` so submitted reviews are readable
  in the UI

### Outstanding Tier (90+)
- Backend persistence for Favourites and Fantasy Movies via new Assignment 1
  Lambda endpoints (requires new CDK work in Assignment 1 repo)
- Rich breadth: all lower tier features implemented and polished

---

## Out of Scope

1. **Server-Side Rendering (SSR):** This is a client-side SPA only.
2. **Automated test suite:** No Vitest, Jest, or Playwright tests are required.
3. **Non-TV entity variants:** Actor entity pages are not in scope; TV is the
   chosen second entity.
4. **Backend response validation:** Not implemented in Assignment 1 and not
   required for this frontend work.
5. **Multi-user or admin features:** All features are single-user, client-side.
6. **Real-time updates / WebSockets:** Not required.
7. **i18n / localisation:** English only.

---

## Expected Functional Behaviour

### TV Entity

**Discover TV page (`/tv`):**
- Fetches from TMDB `/3/discover/tv` via a new `getTVSeries()` function in
  `tmdb-api.ts`
- Renders using `TemplateMovieListPage` with a `TVCard` component mirroring
  `MovieCard`
- `TVCard` uses the same render-prop `action` slot pattern as `MovieCard`
- Applies `useFiltering` with at least a title filter (genre filter optional)
- Each TV card links to `/tv/:id` (parameterised route)

**TV Details page (`/tv/:id`):**
- Fetches from TMDB `/3/tv/:id` and `/3/tv/:id/images`
- Renders using `TemplateMoviePage` with a `TVDetails` component
- Displays: name, overview, first air date, number of seasons, genres, poster
- Back navigation returns to Discover TV list

**Favourite TV page:**
- Mirrors `FavouriteMoviesPage` using `useQueries` per favourite TV id
- TV favourites stored as `tvFavourites: number[]` in `MoviesContext`
- Card actions: remove from favourites
- Accessible only when signed in (PrivateRoute — Very Good tier)

**Routing:**
```
/tv                  → TVSeriesPage (public)
/tv/:id              → TVDetailsPage (public)
/tv/favourites       → FavouriteTVPage (private — Very Good+)
```

**Data hyperlinking:**
- TV list cards link to `/tv/:id` (Good tier)
- Genre chips on TV details link to a filtered discover view (Very Good tier)

---

### Fantasy Movie

**Basic (Good tier):**
- New page `/fantasy-movie/create`
- Form fields: Title, Overview, Genres (multi-select from TMDB genres),
  Release Date (date picker), Runtime (number, minutes), Production Company(s)
  (free-text, one or more entries)
- Uses `react-hook-form` with validation (all fields required, runtime > 0)
- On submit: stores in `MoviesContext` as `fantasyMovies: FantasyMovie[]`
- After submission: navigates to a `/fantasy-movie` list page showing saved
  fantasy movies
- Accessible only when signed in (PrivateRoute — Very Good+ enforces this;
  at Good tier it may be unprotected)

**Advanced (Excellent tier):**
- Extend the Basic form with a dynamic Cast list:
  - "Add Cast Member" button appends a row with Role Name and Description fields
  - Each row can be removed
  - Minimum 0 cast members (cast list is optional)
- Poster: file input (`<input type="file" accept="image/*">`) that stores the
  selected image as a data URL in state and previews it in the form
- No actual file upload to a server is required unless Outstanding tier
  persistence is implemented

---

### Sort Fix and Multi-Criteria Search

**Sort fix (Good tier):**
- Add a working sort control inside the existing "Sort the movies" card in
  `FilterMoviesCard.tsx`
- Minimum: a MUI Select with options "Rating (high to low)" and
  "Release date (new to old)"
- Wire the selected sort into `useFiltering` or apply it directly in the page
  component after filtering
- The sort must visibly reorder the displayed list

**Multi-criteria Search (Very Good tier):**
- New `MultiCriteriaSearch` component or extension of `FilterMoviesCard`
- Additional filter fields: Release year (Select: last 5 years), Minimum
  rating (Slider or Select: 5+, 6+, 7+, 8+), Original language (Select:
  English, French, Spanish, Korean, Other)
- All criteria are AND-combined with the existing title and genre filters via
  `useFiltering`
- Each new criterion is a named predicate added to the filters array

---

### Pagination

**(Very Good tier)**

- Apply to at least one listing page (Home recommended as it has the most data)
- Use react-query's `keepPreviousData` pattern:
  ```typescript
  useQuery(["discover", page], () => getMovies(page), { keepPreviousData: true })
  ```
- Update `getMovies()` and `getTVSeries()` in `tmdb-api.ts` to accept a `page`
  parameter (TMDB API supports `&page=N`)
- Add `Pagination` component (MUI `Pagination` or custom prev/next buttons)
- The current page number is held in local state on the page component
- While a new page is loading, the previous page results remain visible
  (this is the purpose of `keepPreviousData`)
- Total pages derived from TMDB `total_pages` in the response (requires
  updating API functions to return `{ results, total_pages }` instead of
  just `results`)

---

### Authentication and Private/Public Routes

**(Very Good tier)**

**AuthContext (`src/contexts/AuthContext.tsx`):**
```typescript
type AuthContextInterface = {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  signIn: (token: string, username: string) => void;
  signOut: () => void;
}
```
- Token stored in both context state and `localStorage` so it survives refresh
- `isAuthenticated` derived as `token !== null`

**Sign In page (`/signin`):**
- Form fields: Username, Password
- On submit: `POST ${VITE_AUTH_API}/auth/signin`
- On success: call `context.signIn(data.token, username)`, navigate to `/`
- On failure: display error message from API response

**Sign Up page (`/signup`):**
- Form fields: Username, Password, Email
- On submit: `POST ${VITE_AUTH_API}/auth/signup`
- On success: navigate to `/confirm` with username in state

**Confirm page (`/confirm`):**
- Form fields: Username (pre-filled), Verification code
- On submit: `POST ${VITE_AUTH_API}/auth/confirm-signup`
- On success: navigate to `/signin` with a success message

**Sign Out:**
- Button in `SiteHeader` visible when `isAuthenticated === true`
- Calls `GET ${VITE_AUTH_API}/auth/signout` then `context.signOut()`

**PrivateRoute component (`src/components/PrivateRoute/index.tsx`):**
```typescript
// If not authenticated, redirect to /signin
// If authenticated, render children
```
- Wrap in `src/index.tsx` around: `/tv/favourites`, `/movies/favourites`,
  `/fantasy-movie/create`, `/playlists/create`

**SiteHeader changes:**
- Replace "Option 3" → "TV Series" → `/tv`
- Replace "Option 4" → "Fantasy Movies" → `/fantasy-movie`
- Add "Sign In" button (visible when not authenticated)
- Add "Sign Out" + username display (visible when authenticated)

---

### Backend Persistence

**(Excellent tier — review persistence)**

**`src/api/app-api.ts` (new file):**
```typescript
const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
  "Content-Type": "application/json",
  "Content-Length": "...",  // computed per request
});

export const addReview = (review: { movieID: number; date: string; text: string }) =>
  fetch(`${import.meta.env.VITE_APP_API}/movies/reviews`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify(review),
  }).then(res => res.json());

export const getMovieReviewsFromAPI = (movieId: number) =>
  fetch(`${import.meta.env.VITE_APP_API}/movies/${movieId}/reviews`)
    .then(res => res.json());

export const updateReview = (movieId: number, review: { date: string; text: string }) =>
  fetch(`${import.meta.env.VITE_APP_API}/movies/${movieId}/reviews`, {
    method: "PUT",
    headers: getAuthHeader(),
    body: JSON.stringify(review),
  }).then(res => res.json());
```

**`AddMovieReviewPage.tsx` changes:**
- After successful form submit, call `addReview()` from `app-api.ts` via a
  react-query `useMutation`
- Show loading spinner during mutation; show success/error snackbar on result
- On success: also call the existing `context.addReview()` for immediate UI
  update before cache invalidates

**`FavouriteMoviesPage.tsx` changes:**
- Fetch persisted reviews from API for each favourite movie using `useQuery`
  with key `["api-reviews", movieId]`
- Display them alongside any local context reviews

**`MoviesContext` changes:**
- Expose `myReviews` in the context value:
  ```typescript
  myReviews: { [movieId: number]: Review }
  ```

**(Outstanding tier — Favourites and Fantasy Movie persistence)**
- New Lambda endpoints required in Assignment 1 repo:
  - `POST /movies/favourites` — save a favourite
  - `GET /movies/favourites` — fetch user's favourites
  - `POST /fantasy-movies` — save a fantasy movie
  - `GET /fantasy-movies` — fetch user's fantasy movies
- Frontend: replace context-only storage with `useMutation` + `useQuery`
  against these new endpoints
- On sign in, fetch and hydrate context from backend

---

### Ordered Favourites and Playlists

**(Excellent tier)**

**Ordered Favourites:**
- `MoviesContext` stores favourites as an ordered array (already is `number[]`)
- `FavouriteMoviesPage` renders up/down arrow icon buttons on each card, or
  uses MUI drag-and-drop (or HTML5 draggable) to reorder
- `MoviesContext` adds `reorderFavourites(fromIndex: number, toIndex: number)`
- The reordered list is persisted to `localStorage` on change so order
  survives a page refresh

**Themed Playlists:**
- `MoviesContext` adds `playlists: Playlist[]` where:
  ```typescript
  type Playlist = {
    id: string;        // uuid or timestamp-based
    title: string;
    theme: string;
    movieIds: number[];
  }
  ```
- New page `/playlists` — lists all playlists with title and theme
- New page `/playlists/create` (PrivateRoute) — form: Title, Theme (text),
  then a search-and-add interface to add movies from the discover list
- Each playlist detail view shows its movies as `MovieCard` components in
  read-only mode (no action slot needed)
- Playlists persisted to `localStorage` (Outstanding tier may persist to
  backend if new endpoint added)

---

## Non-Functional Requirements

1. **Incremental commits:** Commit at least once per development session.
   Each commit message must state what was attempted and what was completed.
   Partial/broken work may be committed; progress must be clear.

2. **README:** Must be updated to document all Assignment 2 features, any
   design decisions, how to run the app, and environment variable setup
   (`.env` keys required: `VITE_TMDB_KEY`, `VITE_AUTH_API`, `VITE_APP_API`).

3. **AI Usage Documentation (MANDATORY):** The assignment explicitly requires
   AI usage to be documented. The `AIUSAGE.md` file (or README section) must
   include:
   - Which AI tool(s) were used (e.g. Cursor with Claude Sonnet)
   - What tasks the AI assisted with (e.g. spec generation, component
     scaffolding, CORS debugging, prompt refinement)
   - How generated output was reviewed, edited, and validated
   - Which parts of the final solution were significantly AI-influenced
   - Chat histories must be included in the repo in a text file for review

4. **Explainability:** Every line of code submitted must be explainable in a
   Zoom interview. Do not submit code you cannot explain technically. This
   applies to AI-generated code: review it, understand it, be able to justify
   every design decision.

5. **Environment variables:** Never commit API keys or tokens. The `.env` file
   must be in `.gitignore`. Provide a `.env.example` file with placeholder
   values.

6. **Tier coherence:** The app must be fully navigable and not crash at any
   tier boundary. Each tier adds to, not breaks, the previous tier.

---

## Repository Standards

Based on the existing codebase, the following patterns must be followed:

- **API functions:** Plain `fetch()` wrappers in `src/api/`, no Axios
- **Component files:** Single `.tsx` file per component; no separate
  index barrel files (existing pattern uses direct imports)
- **Styling:** MUI `sx` prop only; no CSS modules, no Tailwind
- **Types:** All shared types in `src/types/movieAppTypes.ts`; TMDB-specific
  shapes from `src/types/generated/tmdb.ts`
- **State:** Server state via react-query; shared client state via Context;
  local UI state via `useState`
- **Forms:** `react-hook-form` for all forms (review form sets the precedent)
- **Icons:** `@mui/icons-material` only
- **Routing:** React Router v6 `<Routes>/<Route>` in `src/index.tsx`
- **Page templates:** Reuse `TemplateMovieListPage` and `TemplateMoviePage`
  for all new list and detail pages respectively
- **Card actions:** Always use the render-prop `action` slot on card components

---

## Technical Considerations

- **react-query v3** is installed (not v4/v5). Pagination uses
  `keepPreviousData: true` on the query options object, not the v5
  `placeholderData` API.
- **TMDB TV endpoints** mirror movie endpoints:
  `GET /3/discover/tv`, `GET /3/tv/:id`, `GET /3/tv/:id/images`
  TV shows use `name` (not `title`) and `first_air_date` (not `release_date`).
  Types must account for these differences.
- **Content-Length header** is required by the Assignment 1 API Gateway
  validator on `POST /movies/reviews`. Compute it as
  `String(new TextEncoder().encode(bodyString).length)`.
- **Cognito password policy** enforces minimum 8 characters with mixed case
  and a symbol (matching Assignment 1 API validation schema).
- **Poster upload:** For the Advanced Fantasy Movie form, use a `FileReader`
  to convert the selected image to a base64 data URL stored in React state —
  no server upload required unless Outstanding tier persistence is implemented.
- **Ordered favourites persistence:** Use `localStorage` (`JSON.stringify` /
  `JSON.parse`) so reordering survives page refresh without a backend.
- **The `useMovie` dead-code hook** should either be wired into the TV entity
  pattern (it fetches a single movie by id) or deleted. Do not leave it as
  dead code in the final submission.

---

## Design Considerations

- Follow the existing MUI visual style: `AppBar` header, `Grid` layouts,
  `Card` components for list items, `Drawer` for filter/sort panels.
- TV Series cards should be visually consistent with Movie cards (same MUI
  `Card` structure, same avatar action pattern).
- Authentication pages (Sign In, Sign Up, Confirm) should use a centred MUI
  `Paper` or `Card` container with a form inside, matching the existing
  `reviewForm` visual approach.
- The Fantasy Movie create page should clearly separate Basic fields (always
  shown) from the Cast section (collapsible or below a divider) in the
  Advanced version.
- Pagination controls should appear below the movie grid, centred, using
  MUI `Pagination` component.

---

## Security Considerations

- **Never commit `.env`:** Ensure `VITE_TMDB_KEY`, `VITE_AUTH_API`, and
  `VITE_APP_API` are in `.env` (gitignored). Provide `.env.example`.
- **Token storage:** The JWT is stored in `localStorage`. This is acceptable
  for an academic project; note in AIUSAGE.md or README that `httpOnly`
  cookie storage would be preferred in production.
- **Proof artifacts:** Screenshots and videos for the YouTube demo must not
  show API keys, JWT tokens, or real email addresses. Use a test account.
- **Auth state on refresh:** Read token from `localStorage` on `AuthContext`
  initialisation so users remain signed in after a page refresh.
- **Token expiry:** The Assignment 1 JWT has `Max-Age=3600` (1 hour). If an
  API call returns 401, redirect to `/signin`. A full refresh-token flow is
  out of scope.

---

## Demoable Units of Work

### Unit 1 — Good Tier: TV Entity + Sort Fix + Fantasy Movie Basic

**Purpose:** Demonstrates the core "new entity" requirement, resolves all
baseline stubs, and adds the Fantasy Movie creator. App is independently
gradeable at this tier.

**Functional Requirements:**
- The system shall display a list of TV series fetched from TMDB `/3/discover/tv`
- The system shall navigate to a TV series detail page at `/tv/:id`
- The system shall display TV series name, overview, first air date, poster,
  and number of seasons on the detail page
- The system shall sort the movie/TV list by at least one criterion (rating or
  date) using a control in `FilterMoviesCard`
- The user shall be able to fill and submit the Fantasy Movie Basic form with
  Title, Overview, Genres, Release Date, Runtime, and Production Company
- The system shall store submitted fantasy movies in `MoviesContext`
- The system shall replace "Option 3" and "Option 4" nav links with working
  routes to TV Series and Fantasy Movies pages

**Proof Artifacts:**
- Screenshot: Discover TV page showing a grid of TV cards with posters and
  titles demonstrates TMDB TV integration
- Screenshot: TV Details page for a specific series demonstrates parameterised
  routing and detail view
- Screenshot: Sorted movie list (e.g. by rating) demonstrates sort fix
- Screenshot: Completed Fantasy Movie Basic form and resulting list entry
  demonstrates form submission and context storage
- Screenshot: SiteHeader showing "TV Series" and "Fantasy Movies" nav links
  demonstrates stub resolution

---

### Unit 2 — Very Good Tier: Auth + Private Routes + Pagination + TV Favourites + Multi-Search

**Purpose:** Adds the authentication system, protected routes, and UX
improvements. Demonstrates the assignment's "Adapt and Experiment" theme.

**Functional Requirements:**
- The system shall allow a user to sign up, confirm their account, and sign in
  via the Assignment 1 Auth API
- The system shall store the JWT in `AuthContext` and `localStorage`
- The system shall redirect unauthenticated users to `/signin` when accessing
  protected routes
- The system shall display paginated results on the Home page with
  prev/next controls, keeping previous results visible during loading
- The user shall be able to add TV series to favourites (stored in context)
- The system shall provide a multi-criteria search form with at least 3
  criteria beyond existing title/genre filters

**Proof Artifacts:**
- Screen recording: Full sign-up → confirm → sign-in flow ending on the
  home page demonstrates auth integration
- Screenshot: Unauthenticated attempt to access `/movies/favourites` redirects
  to `/signin` demonstrates PrivateRoute
- Screenshot: Paginated Home page showing page 2 results with prev/next
  controls demonstrates pagination
- Screenshot: Favourite TV series page showing series added from Discover TV
  demonstrates TV favourites and context extension

---

### Unit 3 — Excellent Tier: Ordered Favourites + Playlists + Fantasy Movie Advanced + Review Persistence

**Purpose:** Demonstrates independent learning through features not directly
covered in labs. Each feature requires researching and applying techniques
beyond the course material.

**Functional Requirements:**
- The user shall be able to reorder their favourite movies using UI controls
- The system shall persist the reordered favourites list to `localStorage`
- The user shall be able to create a themed playlist with a Title, Theme, and
  a list of movies
- The user shall be able to add cast members (role name + description) to the
  Fantasy Movie Advanced form
- The user shall be able to select a poster image in the Fantasy Movie form
  and see a preview before submission
- The system shall submit a movie review to `POST /movies/reviews` on the
  Assignment 1 API and confirm persistence on page refresh

**Proof Artifacts:**
- Screen recording: Reordering favourites list and refreshing the page shows
  order preserved demonstrates localStorage persistence
- Screenshot: Created playlist page showing title, theme, and movie list
  demonstrates playlist feature
- Screenshot: Fantasy Movie Advanced form with cast members and poster preview
  demonstrates advanced form
- Screen recording: Submit review → refresh page → review still visible
  demonstrates backend persistence

---

### Unit 4 — Outstanding Tier: Full Backend Persistence

**Purpose:** Demonstrates exceptional ability through new backend endpoint
development and full-stack persistence for Favourites and Fantasy Movies.

**Functional Requirements:**
- The system shall persist and retrieve favourites from a new
  `POST/GET /movies/favourites` Assignment 1 endpoint
- The system shall persist and retrieve fantasy movies from a new
  `POST/GET /fantasy-movies` Assignment 1 endpoint
- The system shall hydrate context from the backend on sign in
- The system shall demonstrate a rich breadth of features across all lower tiers

**Proof Artifacts:**
- Screenshot: DynamoDB console showing favourites records for the signed-in user
- Screenshot: DynamoDB console showing a persisted fantasy movie record
- Screen recording: Sign out, sign back in, favourites and fantasy movies
  restored from backend demonstrates full persistence

---

## Likely Files To Add

```
src/api/app-api.ts                         — Assignment 1 API fetch wrapper
src/contexts/AuthContext.tsx               — Token, username, isAuthenticated
src/pages/TVSeriesPage.tsx                 — Discover TV list
src/pages/TVDetailsPage.tsx                — Single TV series detail
src/pages/FavouriteTVPage.tsx              — Favourite TV series list
src/pages/FantasyMoviePage.tsx             — List of saved fantasy movies
src/pages/FantasyMovieCreatePage.tsx       — Create/edit fantasy movie form
src/pages/SignInPage.tsx                   — Sign in form
src/pages/SignUpPage.tsx                   — Sign up form
src/pages/ConfirmSignUpPage.tsx            — Email verification code form
src/pages/PlaylistPage.tsx                 — List all playlists
src/pages/PlaylistCreatePage.tsx           — Create playlist form
src/components/TVCard.tsx                  — TV series card (mirrors MovieCard)
src/components/TVDetails.tsx               — TV series detail body component
src/components/cardIcons/AddTVToFavourites.tsx
src/components/cardIcons/RemoveTVFromFavourites.tsx
src/components/FantasyMovieForm/index.tsx  — Basic + Advanced fantasy form
src/components/MultiCriteriaSearch.tsx     — Additional filter controls
src/components/PrivateRoute/index.tsx      — Auth guard wrapper
.env.example                               — Placeholder env vars for README
```

---

## Likely Files To Modify

| File | Why it changes |
|------|----------------|
| `src/index.tsx` | Add routes for TV, auth, fantasy movie, playlists; wrap protected routes in `PrivateRoute`; add `AuthContext` provider |
| `src/contexts/moviesContext.tsx` | Expose `myReviews`; add `tvFavourites[]`; add `fantasyMovies[]`; add `playlists[]`; add `reorderFavourites()` |
| `src/components/SiteHeader.tsx` | Replace Option 3/4; add Sign In/Out; show username |
| `src/components/HeaderMovie.tsx` | Replace `localStorage` favourites check with `MoviesContext` |
| `src/components/FilterMoviesCard.tsx` | Implement sort controls in the existing empty "Sort" card |
| `src/api/tmdb-api.ts` | Add `getTVSeries(page)`, `getTVSeriesDetails(id)`, `getTVSeriesImages(id)`; update `getMovies()` and `getUpcomingMovies()` to accept a `page` parameter and return `{ results, total_pages }` |
| `src/types/movieAppTypes.ts` | Add `TVSeriesOverview`, `TVSeriesDetails`, `FantasyMovie`, `CastMember`, `Playlist`, auth types |
| `src/pages/FavouriteMoviesPage.tsx` | Add persisted review fetch; add reorder controls (Excellent tier) |
| `src/pages/AddMovieReviewPage.tsx` | Wire form submission to `app-api.ts` `addReview()` mutation |
| `src/hooks/useMovie.ts` | Either wire into TV detail pattern or delete (remove dead code) |

---

## Acceptance Criteria

| Tier | Feature | Criterion |
|------|---------|-----------|
| Good | TV List | `/tv` renders a grid of TV series cards with posters fetched from TMDB |
| Good | TV Detail | `/tv/:id` renders detail for any valid TMDB TV id passed in the URL |
| Good | TV Hyperlinking | Clicking a TV card navigates to the correct `/tv/:id` detail page |
| Good | Sort | Selecting a sort option from the Sort card visibly reorders the displayed movie list |
| Good | Fantasy Basic | Submitting the Fantasy Movie form adds an entry to the fantasy movies list page |
| Good | Nav stubs | SiteHeader shows no placeholder "Option 3" / "Option 4" links |
| Good | Header consistency | `HeaderMovie` favourite heart reads from `MoviesContext`, not `localStorage` |
| Good | myReviews | Submitted reviews are accessible via `MoviesContext` and visible in the UI |
| Very Good | Pagination | Home page shows page 1 and page 2 results; previous page remains visible during page change |
| Very Good | Auth flow | A new user can sign up, confirm, sign in, and sign out successfully |
| Very Good | PrivateRoute | Navigating to `/movies/favourites` without signing in redirects to `/signin` |
| Very Good | TV Favourites | A signed-in user can add a TV series to favourites and see it on the Favourite TV page |
| Very Good | Multi-search | Applying 2+ criteria simultaneously narrows the displayed movie list correctly |
| Excellent | Review persistence | A submitted review is still present after a full browser page refresh |
| Excellent | Ordered favourites | Reordering favourites and refreshing the page shows the new order preserved |
| Excellent | Playlists | A created playlist with title, theme, and 2+ movies is visible on the Playlists page |
| Excellent | Fantasy Advanced | The Fantasy Movie form accepts cast member entries and displays a poster preview |
| Outstanding | Backend favourites | A favourite added while signed in persists to DynamoDB and is restored on next sign in |
| Outstanding | Backend fantasy | A fantasy movie persists to DynamoDB and is restored on next sign in |

---

## Evidence Required

### YouTube Video (required deliverable)

The video must demonstrate:

1. Browse and navigate to a TV series detail page (Good)
2. Sort the movie list by a sort criterion (Good)
3. Fill and submit the Fantasy Movie Basic form (Good)
4. Sign up a new user and complete email verification (Very Good)
5. Sign in and verify sign out shows username (Very Good)
6. Attempt to access a private route while signed out; show redirect (Very Good)
7. Paginate through at least 2 pages of movies (Very Good)
8. Add a TV series to favourites; view Favourite TV page (Very Good)
9. Submit a movie review; refresh the page; confirm it persists (Excellent)
10. Reorder favourites; refresh; confirm order is preserved (Excellent)
11. Create a playlist with 2+ movies (Excellent)
12. *(If Outstanding)* Show DynamoDB console with persisted favourites/fantasy movie record

### README (required deliverable)

Must include:
- Feature list organised by grade tier
- Environment variable setup instructions with `.env.example` reference
- How to run the app locally (`npm run dev`)
- Assignment 1 backend setup and `cdk deploy` instructions
- AI usage section (or reference to `AIUSAGE.md`)
- Links to: GitHub repo, YouTube demo video

### AIUSAGE.md (mandatory per assignment spec)

Must document:
- Tool(s) used (e.g. Cursor IDE with Claude Sonnet 4.6)
- Tasks AI assisted with: codebase analysis, CORS debugging, prompt
  refinement, spec generation, component scaffolding
- How AI output was reviewed and validated (e.g. read and understood each
  component, tested in browser, corrected errors)
- Which parts of the solution were significantly AI-influenced
- Link to or inclusion of chat histories

---

## Success Metrics

1. **Good tier complete:** App runs without errors with TV entity, working
   sort, and Fantasy Movie Basic — all baseline stubs resolved.
2. **Very Good tier complete:** Auth flow works end-to-end in the browser;
   protected routes redirect correctly; pagination loads page 2 without
   blank screen.
3. **Excellent tier complete:** Review submitted via browser persists after
   refresh; favourites order persists after refresh.
4. **Outstanding tier complete:** DynamoDB console shows records for
   favourites and fantasy movies created during the demo session.
5. **Explainability:** Every component and design decision can be described
   and justified in a short Zoom interview.

---

## Open Questions

1. **Playlist persistence at Excellent tier:** Should playlists be persisted
   to `localStorage` only, or is there appetite to add a new DynamoDB endpoint
   for them at Outstanding tier? (Current spec assumes `localStorage` at
   Excellent; backend persistence at Outstanding is optional extra work.)

2. **Ordered favourites UX:** Up/down icon buttons are simpler to implement;
   drag-and-drop is more polished but requires a library (e.g. `@dnd-kit`).
   Choose based on available time. If using a third-party library, ensure you
   can explain how it works.

3. **CloudFront deployment:** The Very Good tier assignment spec mentions
   "Frontend CDN deployment to AWS CloudFront" as an optional feature. This
   is not in scope above but can be added if time allows — update CORS
   `allowOrigins` to include the CloudFront domain if deployed.

4. **Cognito account cleanup:** If the Cognito User Pool from Assignment 1
   has been deleted (stack torn down), a `cdk deploy` will recreate it and
   all existing test users will be lost. Create a fresh test account after
   redeployment.
