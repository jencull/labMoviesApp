# Assignment 2 — Task List

**Source spec:** `src/specs/assignment-2/spec.md`
**Baseline:** Completed Lab 4/5 solution
**Generated:** 2026-05-06

---

## Feature Reference

| Spec Section | Covered by Parent Task(s) |
|---|---|
| Known Incomplete Stubs | PT-1 |
| TV Entity | PT-2 |
| Fantasy Movie Basic | PT-3 |
| Auth + PrivateRoute | PT-4 |
| Pagination | PT-5 |
| TV Favourites | PT-6 |
| Multi-Criteria Search | PT-7 |
| Review Persistence | PT-8 |
| Ordered Favourites | PT-9 |
| Themed Playlists | PT-10 |
| Fantasy Movie Advanced | PT-11 |
| Outstanding Persistence | PT-12 |
| Pre-Requisite Backend Fix | PT-0 |

---

## Planning Assumptions

1. The Lab 4/5 baseline runs without errors before any Assignment 2 work begins.
2. The Assignment 1 CDK stack can be redeployed (`CDK_DOCKER=podman npx cdk deploy`).
3. A valid `.env` file exists locally with `VITE_TMDB_KEY`; `VITE_AUTH_API` and
   `VITE_APP_API` will be added before PT-4 work begins.
4. `react-query v3` is installed — all pagination uses `keepPreviousData: true`,
   NOT the v4/v5 `placeholderData` API.
5. All components follow the existing patterns: MUI `sx` prop, single `.tsx` file,
   no CSS modules, `react-hook-form` for all forms.
6. The `useMovie` dead-code hook is removed at PT-1 or wired into the TV pattern
   at PT-2 — it must not remain in the final submission.
7. Every parent task must leave the app fully navigable and crash-free before
   moving to the next parent task.

---

## Parent Tasks — Grouped by Grade Tier

---

### PRE-REQUISITE TIER

---

#### PT-0 — Assignment 1 Backend CORS and Auth Fix

| Field | Value |
|---|---|
| **Goal** | Fix the CORS wildcard and authorizer identity source in Assignment 1 so browser-based fetch calls with credentials work correctly. |
| **Spec sections** | Pre-Requisite section |
| **Demoable outcome** | `curl` OPTIONS request to App API returns `access-control-allow-origin: http://localhost:5173` and `access-control-allow-credentials: true` |
| **Blocker for** | PT-4 (Auth), PT-6 (TV Favourites), PT-8 (Review Persistence), PT-12 (Outstanding) |
| **Likely files** | `lib/constructs/app-api.ts`, `lib/constructs/auth-api.ts`, `lambda/auth/signin.ts` (Assignment 1 repo) |
| **Status** | `[ ] pending` |

---

### GOOD TIER (40–50%)

---

#### PT-1 — Resolve All Baseline Stubs

| Field | Value |
|---|---|
| **Goal** | Clear all five known incomplete stubs from the Lab 4/5 baseline so the codebase is clean before new features are added. |
| **Spec sections** | Starting Point → Known Incomplete Stubs; Acceptance Criteria rows: Nav stubs, Header consistency, myReviews |
| **Demoable outcome** | App runs with working sort controls, real nav links, exposed myReviews, consistent favourites heart, no dead-code hook |
| **Likely files** | `FilterMoviesCard.tsx`, `SiteHeader.tsx`, `moviesContext.tsx`, `HeaderMovie.tsx`, `hooks/useMovie.ts` |
| **Status** | `[ ] pending` |

#### PT-2 — TV Series Entity

| Field | Value |
|---|---|
| **Goal** | Add TV Series as a fully navigable second entity: TMDB API functions, TypeScript types, TVCard component, Discover TV list page, TV Details page, routes, and card-to-detail hyperlinking. |
| **Spec sections** | Expected Functional Behaviour → TV Entity; Acceptance Criteria rows: TV List, TV Detail, TV Hyperlinking |
| **Demoable outcome** | `/tv` renders a grid of TV cards; clicking one navigates to `/tv/:id` showing series details |
| **Likely files** | `tmdb-api.ts`, `movieAppTypes.ts`, `TVCard.tsx` (new), `TVDetails.tsx` (new), `TVSeriesPage.tsx` (new), `TVDetailsPage.tsx` (new), `index.tsx` |
| **Status** | `[ ] pending` |

#### PT-3 — Fantasy Movie Basic Form

| Field | Value |
|---|---|
| **Goal** | Implement the Fantasy Movie creation form (Basic tier) with all required fields, form validation, context storage, and a list page to view submitted fantasy movies. |
| **Spec sections** | Expected Functional Behaviour → Fantasy Movie → Basic; Acceptance Criteria row: Fantasy Basic |
| **Demoable outcome** | User fills and submits the form; entry appears on the `/fantasy-movie` list page |
| **Likely files** | `FantasyMovieForm/index.tsx` (new), `FantasyMoviePage.tsx` (new), `FantasyMovieCreatePage.tsx` (new), `moviesContext.tsx`, `movieAppTypes.ts`, `index.tsx` |
| **Status** | `[ ] pending` |

---

### VERY GOOD TIER (50–70%)

---

#### PT-4 — Authentication System and Private Routes

| Field | Value |
|---|---|
| **Goal** | Implement `AuthContext`, Sign In / Sign Up / Confirm / Sign Out pages wired to Assignment 1 Auth API, `app-api.ts` fetch wrapper with Bearer token injection, and `PrivateRoute` component protecting gated pages. |
| **Spec sections** | Authentication and Private/Public Routes; Assignment 1 API Surface; Acceptance Criteria rows: Auth flow, PrivateRoute |
| **Demoable outcome** | Full sign-up → confirm → sign-in flow works; navigating to `/movies/favourites` without signing in redirects to `/signin` |
| **Blocker for** | PT-6 (TV Favourites protected page), PT-8 (review mutation auth header) |
| **Depends on** | PT-0 (backend CORS fix must be deployed) |
| **Likely files** | `AuthContext.tsx` (new), `SignInPage.tsx` (new), `SignUpPage.tsx` (new), `ConfirmSignUpPage.tsx` (new), `app-api.ts` (new), `PrivateRoute/index.tsx` (new), `SiteHeader.tsx`, `index.tsx` |
| **Status** | `[ ] pending` |

#### PT-5 — Pagination

| Field | Value |
|---|---|
| **Goal** | Add react-query `keepPreviousData` pagination to the Home page; update `getMovies()` to accept a `page` parameter and return `{ results, total_pages }`; add a MUI Pagination control. |
| **Spec sections** | Pagination section; Acceptance Criteria row: Pagination |
| **Demoable outcome** | Home page shows page 1 results; clicking next loads page 2 while page 1 remains visible during loading |
| **Likely files** | `tmdb-api.ts`, `HomePage.tsx`, `movieAppTypes.ts` |
| **Status** | `[ ] pending` |

#### PT-6 — Favourite TV Series

| Field | Value |
|---|---|
| **Goal** | Add `tvFavourites[]` to `MoviesContext`, create `AddTVToFavourites` and `RemoveTVFromFavourites` card icon components, and build the `FavouriteTVPage` mirroring `FavouriteMoviesPage`. |
| **Spec sections** | TV Entity → Favourite TV page; Acceptance Criteria row: TV Favourites |
| **Demoable outcome** | Signed-in user adds a TV series; it appears on `/tv/favourites` |
| **Depends on** | PT-2 (TVCard component), PT-4 (PrivateRoute for `/tv/favourites`) |
| **Likely files** | `moviesContext.tsx`, `cardIcons/AddTVToFavourites.tsx` (new), `cardIcons/RemoveTVFromFavourites.tsx` (new), `FavouriteTVPage.tsx` (new), `TVCard.tsx`, `index.tsx`, `movieAppTypes.ts` |
| **Status** | `[ ] pending` |

#### PT-7 — Multi-Criteria Search Form

| Field | Value |
|---|---|
| **Goal** | Add release year, minimum rating, and original language filter controls to the movie list, wired into `useFiltering` as additional named predicates. |
| **Spec sections** | Sort Fix and Multi-Criteria Search → Multi-criteria Search; Acceptance Criteria row: Multi-search |
| **Demoable outcome** | Applying 2+ criteria simultaneously (e.g. year + rating) visibly narrows the movie list |
| **Likely files** | `MultiCriteriaSearch.tsx` (new) or `FilterMoviesCard.tsx`, `hooks/useFiltering.ts`, `HomePage.tsx`, `movieAppTypes.ts` |
| **Status** | `[ ] pending` |

---

### EXCELLENT TIER (70–90%)

---

#### PT-8 — Review Persistence via Assignment 1 API

| Field | Value |
|---|---|
| **Goal** | Wire review submission in `AddMovieReviewPage` to `POST /movies/reviews` via a react-query `useMutation`; display persisted reviews on `FavouriteMoviesPage` via `useQuery`; expose `myReviews` from `MoviesContext`. |
| **Spec sections** | Backend Persistence → review persistence; Acceptance Criteria row: Review persistence |
| **Demoable outcome** | Submit review → refresh browser → review still visible on the favourites page |
| **Depends on** | PT-4 (Bearer token in app-api.ts), PT-0 (CORS fix deployed) |
| **Likely files** | `app-api.ts`, `AddMovieReviewPage.tsx`, `FavouriteMoviesPage.tsx`, `moviesContext.tsx` |
| **Status** | `[ ] pending` |

#### PT-9 — Ordered Favourites

| Field | Value |
|---|---|
| **Goal** | Add up/down reorder controls to `FavouriteMoviesPage`, add `reorderFavourites()` to `MoviesContext`, and persist the ordered array to `localStorage` so order survives page refresh. |
| **Spec sections** | Ordered Favourites and Playlists → Ordered Favourites; Acceptance Criteria row: Ordered favourites |
| **Demoable outcome** | Reorder favourites; refresh browser; order is preserved |
| **Likely files** | `moviesContext.tsx`, `FavouriteMoviesPage.tsx`, `movieAppTypes.ts` |
| **Status** | `[ ] pending` |

#### PT-10 — Themed Playlists

| Field | Value |
|---|---|
| **Goal** | Add `playlists: Playlist[]` to `MoviesContext`, build `PlaylistPage` (list view) and `PlaylistCreatePage` (form + movie-add interface), and persist playlists to `localStorage`. |
| **Spec sections** | Ordered Favourites and Playlists → Themed Playlists; Acceptance Criteria row: Playlists |
| **Demoable outcome** | Create a playlist with title, theme, and 2+ movies; it appears on `/playlists` |
| **Likely files** | `moviesContext.tsx`, `PlaylistPage.tsx` (new), `PlaylistCreatePage.tsx` (new), `movieAppTypes.ts`, `index.tsx`, `SiteHeader.tsx` |
| **Status** | `[ ] pending` |

#### PT-11 — Fantasy Movie Advanced Form

| Field | Value |
|---|---|
| **Goal** | Extend the Basic Fantasy Movie form with a dynamic Cast list (role name + description, add/remove rows) and a poster image file input that previews the selected image. |
| **Spec sections** | Fantasy Movie → Advanced; Acceptance Criteria row: Fantasy Advanced |
| **Demoable outcome** | Add 2+ cast members and select a poster image; preview shows; submitted fantasy movie stores cast and poster data |
| **Depends on** | PT-3 (Basic form must exist) |
| **Likely files** | `FantasyMovieForm/index.tsx`, `movieAppTypes.ts` (`CastMember` type) |
| **Status** | `[ ] pending` |

---

### OUTSTANDING TIER (90+)

---

#### PT-12 — Full Backend Persistence (Favourites + Fantasy Movies)

| Field | Value |
|---|---|
| **Goal** | Build new Lambda + CDK endpoints in Assignment 1 for favourites and fantasy movie CRUD; wire the frontend to persist and hydrate these from DynamoDB on sign in. |
| **Spec sections** | Outstanding Tier; Backend Persistence → Outstanding; Acceptance Criteria rows: Backend favourites, Backend fantasy |
| **Demoable outcome** | Sign out, sign back in, favourites and fantasy movies restored from backend (DynamoDB console evidence) |
| **Depends on** | PT-4, PT-8, PT-11 |
| **Likely files** | Assignment 1: new Lambda files, new CDK resource blocks; Frontend: `app-api.ts`, `moviesContext.tsx`, `AuthContext.tsx` (hydration on sign-in) |
| **Status** | `[ ] pending` |

---

## Detailed Subtasks

---

### PT-0 Subtasks — Assignment 1 Backend Fix

| ID | Action | Files | Done condition |
|---|---|---|---|
| PT-0-1 | In `lib/constructs/app-api.ts`, change `identitySources` on `requestAuthorizer` from `header("cookie")` to `header("Authorization")` | `app-api.ts` (A1 repo) | Code diff shows updated identitySource |
| PT-0-2 | In `lib/constructs/app-api.ts`, replace `defaultCorsPreflightOptions` with `allowOrigins: ["http://localhost:5173"]`, `allowCredentials: true`, `allowHeaders: ["Content-Type","Authorization"]`, `allowMethods: Cors.ALL_METHODS` | `app-api.ts` (A1 repo) | Code diff shows specific origin replacing `ALL_ORIGINS` |
| PT-0-3 | Apply the same CORS change to `lib/constructs/auth-api.ts` | `auth-api.ts` (A1 repo) | Code diff matches PT-0-2 pattern |
| PT-0-4 | In `lambda/auth/signin.ts`, change the hardcoded `"Access-Control-Allow-Origin": "*"` in the success response headers to `"http://localhost:5173"` | `signin.ts` (A1 repo) | Code diff shows specific origin |
| PT-0-5 | Run `CDK_DOCKER=podman npx cdk deploy` in the Assignment 1 repo | Terminal | Deploy completes without error; new API Gateway URLs shown in output |
| PT-0-6 | Update `.env` in the Assignment 2 frontend with the new `VITE_AUTH_API` and `VITE_APP_API` values from the deploy output | `.env` | `.env` has both variables set to the deployed API URLs |
| PT-0-7 | Run the verification curl command from the spec against the new App API endpoint and confirm the two required CORS headers are present | Terminal | `access-control-allow-origin: http://localhost:5173` and `access-control-allow-credentials: true` both appear in the curl response |

---

### PT-1 Subtasks — Resolve Baseline Stubs

| ID | Action | Files | Done condition |
|---|---|---|---|
| PT-1-1 | In `FilterMoviesCard.tsx`, add a MUI `Select` control inside the "Sort the movies" card with options "Rating (high to low)" (`vote_average`) and "Release date (new to old)" (`release_date`). Add a `sortOption` prop to `FilterMoviesCardProps` and wire `onChange` to call a new `onSortChange` callback. | `FilterMoviesCard.tsx` | Sort card renders a visible dropdown; selecting an option calls the parent |
| PT-1-2 | In `HomePage.tsx`, add `sortOption` state, pass `sortOption` and `onSortChange` into `FilterMoviesCard`, and apply a `.sort()` to the filtered movies array before passing to `MovieList` | `HomePage.tsx` | Selecting "Rating" visibly reorders the displayed list on screen |
| PT-1-3 | In `SiteHeader.tsx`, replace the "Option 3" entry in `menuOptions` with `{ label: "TV Series", path: "/tv" }` | `SiteHeader.tsx` | "Option 3" no longer appears; "TV Series" link navigates to `/tv` |
| PT-1-4 | In `SiteHeader.tsx`, replace the "Option 4" entry with `{ label: "Fantasy Movies", path: "/fantasy-movie" }` | `SiteHeader.tsx` | "Option 4" no longer appears; "Fantasy Movies" link navigates to `/fantasy-movie` |
| PT-1-5 | In `moviesContext.tsx`, add `myReviews` to the `MovieContextInterface` type definition and to the `value` prop of `MoviesContext.Provider` | `moviesContext.tsx` | `useContext(MoviesContext).myReviews` returns the reviews object in any consuming component |
| PT-1-6 | In `HeaderMovie.tsx`, find the `localStorage.getItem("favourites")` call and replace it with `useContext(MoviesContext).favourites.includes(movie.id)` (adjust field reference to match the actual prop name in that component) | `HeaderMovie.tsx` | Heart icon on Movie Details page reflects the same favourites state as the card icons on the Home page |
| PT-1-7 | In `src/hooks/useMovie.ts`, either: (a) delete the file if it will not be used in the TV entity pattern, or (b) add an import of it in `TVDetailsPage.tsx` if appropriate. Remove from repo either way if unused. | `useMovie.ts` | No TypeScript "declared but never used" warning; file is either deleted or actively imported |

---

### PT-2 Subtasks — TV Series Entity

| ID | Action | Files | Done condition |
|---|---|---|---|
| PT-2-1 | Add TypeScript types `TVSeriesOverview` and `TVSeriesDetails` to `movieAppTypes.ts`. Key differences from movies: `name` not `title`, `first_air_date` not `release_date`, `number_of_seasons`. Include `id`, `overview`, `poster_path`, `genre_ids`, `vote_average`. | `movieAppTypes.ts` | Types compile without errors; fields match TMDB `/3/discover/tv` and `/3/tv/:id` response shapes |
| PT-2-2 | Add three fetch functions to `tmdb-api.ts`: `getTVSeries()` (discover, returns `results`), `getTVSeriesDetails(id)` (single series), `getTVSeriesImages(id)` (returns `posters`). Follow the exact same pattern as the existing movie fetch functions. | `tmdb-api.ts` | Functions exist; calling them in browser console returns JSON |
| PT-2-3 | Create `src/components/TVCard.tsx` as a copy of `MovieCard.tsx` adapted for `TVSeriesOverview`: use `name` for title, `first_air_date` for date, link to `/tv/:id`. Keep the same render-prop `action` slot. | `TVCard.tsx` (new) | Component renders; clicking the card title navigates to `/tv/:id` |
| PT-2-4 | Create `src/pages/TVSeriesPage.tsx` using `TemplateMovieListPage`. Call `getTVSeries()` via `useQuery(["tvSeries"], getTVSeries)`. Pass `TVCard` with an `AddTVToFavourites` action (add this in PT-6; use a placeholder for now). Apply `useFiltering` with a title filter. | `TVSeriesPage.tsx` (new) | Page renders list of TV cards at `/tv` without errors |
| PT-2-5 | Create `src/components/TVDetails.tsx` adapted from `MovieDetails.tsx`. Display: name, overview, first air date, number of seasons, genres. Keep the reviews drawer optional (no TV reviews in scope). | `TVDetails.tsx` (new) | Component renders TV series data correctly when passed a `TVSeriesDetails` prop |
| PT-2-6 | Create `src/pages/TVDetailsPage.tsx` using `TemplateMoviePage`. Extract `id` from `useParams()`. Call `getTVSeriesDetails(id)` via `useQuery(["tvSeries", id], ...)` and `getTVSeriesImages(id)` via `useQuery(["tvImages", id], ...)`. Render `TVDetails` in the body slot. | `TVDetailsPage.tsx` (new) | `/tv/1399` (Game of Thrones TMDB id) renders correctly |
| PT-2-7 | Add two new routes to `src/index.tsx`: `<Route path="/tv" element={<TVSeriesPage />} />` and `<Route path="/tv/:id" element={<TVDetailsPage />} />`. Import both page components. | `index.tsx` | Navigating to `/tv` and `/tv/1399` in the browser renders without errors |
| PT-2-8 | Verify data hyperlinking end-to-end: click a TV card on `/tv` → lands on `/tv/:id` with the correct series name in the header. | Browser | Manual click-through confirms correct id in URL and matching series name on detail page |

---

### PT-3 Subtasks — Fantasy Movie Basic Form

| ID | Action | Files | Done condition |
|---|---|---|---|
| PT-3-1 | Add `FantasyMovie` type to `movieAppTypes.ts` with fields: `id` (string/timestamp), `title`, `overview`, `genres` (string[]), `releaseDate` (string), `runtime` (number), `productionCompanies` (string[]) | `movieAppTypes.ts` | Type compiles without errors |
| PT-3-2 | Extend `MoviesContext`: add `fantasyMovies: FantasyMovie[]` to the interface, `useState<FantasyMovie[]>([])` in the provider, `addFantasyMovie(movie: FantasyMovie)` callback, and expose all three in the `value` prop | `moviesContext.tsx` | `useContext(MoviesContext).fantasyMovies` returns the array in any consuming component |
| PT-3-3 | Create `src/components/FantasyMovieForm/index.tsx` using `react-hook-form`. Fields: Title (TextField), Overview (TextField multiline), Genres (multi-select using TMDB genres from `getGenres()`), Release Date (date input), Runtime (number TextField), Production Companies (dynamic list: add/remove TextField rows). All fields required; runtime must be > 0. | `FantasyMovieForm/index.tsx` (new) | Form renders all fields; submitting with empty title shows validation error; valid submit calls `onSubmit` prop |
| PT-3-4 | Create `src/pages/FantasyMovieCreatePage.tsx`. It renders `FantasyMovieForm`. On submit: call `context.addFantasyMovie()`, then navigate to `/fantasy-movie` | `FantasyMovieCreatePage.tsx` (new) | Filling the form and clicking submit adds one entry to `MoviesContext.fantasyMovies` and redirects |
| PT-3-5 | Create `src/pages/FantasyMoviePage.tsx` that reads `fantasyMovies` from `MoviesContext` and renders them as a list using MUI `Card` components (no action slot needed — read-only list) | `FantasyMoviePage.tsx` (new) | Page renders at `/fantasy-movie`; submitted entries appear after form submission |
| PT-3-6 | Add routes to `src/index.tsx`: `<Route path="/fantasy-movie" element={<FantasyMoviePage />} />` and `<Route path="/fantasy-movie/create" element={<FantasyMovieCreatePage />} />`. The create route will be wrapped in `PrivateRoute` at PT-4. | `index.tsx` | Both routes are accessible and render without errors |

---

### PT-4 Subtasks — Authentication System and Private Routes

| ID | Action | Files | Done condition |
|---|---|---|---|
| PT-4-1 | Create `src/contexts/AuthContext.tsx` with interface `{ token, username, isAuthenticated, signIn, signOut }`. Provider reads `token` from `localStorage` on init (`useState` initial value = `localStorage.getItem("token")`). `signIn` sets state AND writes to `localStorage`; `signOut` clears both. | `AuthContext.tsx` (new) | `useContext(AuthContext).isAuthenticated` returns `true` after calling `signIn` |
| PT-4-2 | Wrap the app in `src/index.tsx` with `<AuthContextProvider>` outside `<MoviesContextProvider>` so auth state is available everywhere. | `index.tsx` | `AuthContext` is accessible from any page component |
| PT-4-3 | Create `src/api/app-api.ts`. Add helper `getAuthHeader()` that reads `localStorage.getItem("token")`, builds `Authorization: Bearer <token>` header, and computes `Content-Length` from the request body string using `new TextEncoder().encode(body).length`. Export `addReview`, `getMovieReviewsFromAPI`, and `updateReview` functions following the spec's fetch patterns. | `app-api.ts` (new) | Calling `addReview()` in the browser console with a valid token and movie ID returns a 200 response from the API |
| PT-4-4 | Create `src/pages/SignInPage.tsx`. Use `react-hook-form` with fields: Username, Password. On submit: `POST ${VITE_AUTH_API}/auth/signin`. On success: call `context.signIn(data.token, username)` and `navigate("/")`. On 4xx error: display the error message from the response body. | `SignInPage.tsx` (new) | Correct credentials navigate to home; wrong credentials show an error message |
| PT-4-5 | Create `src/pages/SignUpPage.tsx`. Fields: Username, Password, Email. Validate: password min 8 chars, mixed case, symbol (match Cognito policy). On submit: `POST ${VITE_AUTH_API}/auth/signup`. On success: `navigate("/confirm", { state: { username } })`. | `SignUpPage.tsx` (new) | Submitting with a real email navigates to `/confirm` |
| PT-4-6 | Create `src/pages/ConfirmSignUpPage.tsx`. Read `username` from `location.state`. Fields: Username (pre-filled, read-only), Code. On submit: `POST ${VITE_AUTH_API}/auth/confirm-signup`. On success: `navigate("/signin")` with a success snackbar or message. | `ConfirmSignUpPage.tsx` (new) | Entering the correct Cognito email code navigates to sign in |
| PT-4-7 | Create `src/components/PrivateRoute/index.tsx`. If `isAuthenticated` is `false`, render `<Navigate to="/signin" replace />`. Otherwise render `children`. | `PrivateRoute/index.tsx` (new) | Visiting `/movies/favourites` without a token redirects to `/signin` |
| PT-4-8 | In `src/index.tsx`, wrap the following routes with `PrivateRoute`: `/movies/favourites`, `/tv/favourites`, `/fantasy-movie/create`, `/playlists/create` | `index.tsx` | All four routes redirect to `/signin` when accessed without a token |
| PT-4-9 | In `SiteHeader.tsx`, consume `AuthContext`. Add a "Sign In" `Button` visible when `!isAuthenticated`. Add a "Sign Out" `Button` and `Typography` showing `username` visible when `isAuthenticated`. Sign Out button calls `GET ${VITE_AUTH_API}/auth/signout` then `context.signOut()`. | `SiteHeader.tsx` | Sign In button appears when logged out; username and Sign Out appear when logged in |
| PT-4-10 | Add routes to `src/index.tsx` for `/signin`, `/signup`, and `/confirm`. These are public routes — no `PrivateRoute` wrapper. | `index.tsx` | All three auth pages are navigable without authentication |
| PT-4-11 | Add `.env.example` to the repo root with placeholder values for all three keys: `VITE_TMDB_KEY=your_key_here`, `VITE_AUTH_API=https://...`, `VITE_APP_API=https://...`. Confirm `.env` is in `.gitignore`. | `.env.example` (new) | File exists in repo; `.env` does not appear in `git status` |

---

### PT-5 Subtasks — Pagination

| ID | Action | Files | Done condition |
|---|---|---|---|
| PT-5-1 | Update `getMovies(page: number = 1)` in `tmdb-api.ts` to accept a `page` parameter and append `&page=${page}` to the URL. Change the return to `res.json()` without `.results` extraction so the full response `{ results, total_pages }` is returned. | `tmdb-api.ts` | Calling `getMovies(2)` returns page 2 results |
| PT-5-2 | Update `DiscoverMoviesProps` (or add a new type) in `movieAppTypes.ts` to reflect the shape `{ results: DiscoverMovieOverviewProps[], total_pages: number }`. Adjust any existing consumers of `getMovies()` that destructure `.results` | `movieAppTypes.ts`, `HomePage.tsx` | TypeScript compiles without errors after the shape change |
| PT-5-3 | In `HomePage.tsx`, add `const [page, setPage] = useState(1)`. Change the `useQuery` call to `useQuery(["discover", page], () => getMovies(page), { keepPreviousData: true })`. Extract `data.results` for the movie list and `data.total_pages` for the pagination control. | `HomePage.tsx` | Changing `page` state re-fetches; previous results remain visible during loading |
| PT-5-4 | Add a MUI `<Pagination>` component below the `MovieList` grid in `HomePage.tsx`. Bind `count` to `data.total_pages` and `page` to the `page` state. On `onChange`, call `setPage(value)`. | `HomePage.tsx` | Pagination controls appear and clicking page 2 loads different movies |
| PT-5-5 | Verify `keepPreviousData` behaviour: navigate to page 2, then immediately to page 3 — page 2 results should remain visible while page 3 loads (no blank flash). | Browser | No blank-screen flash between page changes |

---

### PT-6 Subtasks — Favourite TV Series

| ID | Action | Files | Done condition |
|---|---|---|---|
| PT-6-1 | Add `tvFavourites: number[]`, `addToTVFavourites()`, and `removeFromTVFavourites()` to `MoviesContext` interface, provider state, and `value` prop | `moviesContext.tsx` | `useContext(MoviesContext).tvFavourites` is accessible and mutable |
| PT-6-2 | Create `src/components/cardIcons/AddTVToFavourites.tsx` using `useContext(MoviesContext)` and calling `addToTVFavourites(tvSeries)`. Mirror the `AddToFavourites.tsx` pattern exactly. | `cardIcons/AddTVToFavourites.tsx` (new) | Icon renders; clicking it adds the TV id to `tvFavourites` |
| PT-6-3 | Create `src/components/cardIcons/RemoveTVFromFavourites.tsx` mirroring `RemoveFromFavourites.tsx` but calling `removeFromTVFavourites()` | `cardIcons/RemoveTVFromFavourites.tsx` (new) | Icon renders; clicking it removes the TV id from `tvFavourites` |
| PT-6-4 | Update `TVSeriesPage.tsx` to pass `AddTVToFavourites` as the card action; update `TVCard.tsx` action slot accordingly | `TVSeriesPage.tsx`, `TVCard.tsx` | Heart/bookmark icon appears on TV cards on the discover page |
| PT-6-5 | Create `src/pages/FavouriteTVPage.tsx`. Read `tvFavourites` from `MoviesContext`. Use `useQueries` (one per id) with key `["tvSeries", id]` to fetch details. Render each as a `TVCard` with `RemoveTVFromFavourites` as the action. | `FavouriteTVPage.tsx` (new) | `/tv/favourites` shows the TV series that were added as favourites |
| PT-6-6 | Add `/tv/favourites` route to `src/index.tsx` wrapped in `PrivateRoute` (already done at PT-4-8 if that task was completed first; verify it is present) | `index.tsx` | Route exists and redirects when not authenticated |

---

### PT-7 Subtasks — Multi-Criteria Search

| ID | Action | Files | Done condition |
|---|---|---|---|
| PT-7-1 | Add filter predicate types to `movieAppTypes.ts` or `useFiltering.ts` to accommodate the new criteria (year, rating, language) in addition to the existing title/genre types. Add `FilterOption` values: `"year"`, `"minRating"`, `"language"` | `movieAppTypes.ts` or `useFiltering.ts` | TypeScript `FilterOption` type includes new values without errors |
| PT-7-2 | Create `src/components/MultiCriteriaSearch.tsx`. Add three MUI controls: Release Year (`Select` with last 5 years + "All"), Minimum Rating (`Select` with options "Any", "5+", "6+", "7+", "8+"), Original Language (`Select`: "Any", "en", "fr", "es", "ko"). Wire each to `onUserInput` callback with the new filter type keys. | `MultiCriteriaSearch.tsx` (new) | Component renders three dropdowns; selecting values calls `onUserInput` |
| PT-7-3 | Add year, rating, and language predicate functions to the `useFiltering` hook or define them inline in `HomePage.tsx`. Predicate for year: `movie.release_date.startsWith(year)`. For rating: `movie.vote_average >= threshold`. For language: `movie.original_language === code`. | `hooks/useFiltering.ts` or `HomePage.tsx` | Filtering logic narrows the movie list correctly when each new control is used |
| PT-7-4 | Integrate `MultiCriteriaSearch` into `HomePage.tsx` — render it inside or below `MovieFilterUI`/`FilterMoviesCard`. Pass the new filter states down and add them to the `useFiltering` filters array. | `HomePage.tsx` | All 5 filter types (title, genre, year, rating, language) are AND-combined correctly |

---

### PT-8 Subtasks — Review Persistence

| ID | Action | Files | Done condition |
|---|---|---|---|
| PT-8-1 | In `AddMovieReviewPage.tsx`, import `useMutation` from `react-query` and the `addReview` function from `app-api.ts`. After the existing `context.addReview()` call, also fire `mutate({ movieID, date, text })`. | `AddMovieReviewPage.tsx` | Review submission triggers the API call (visible in browser network tab) |
| PT-8-2 | Add loading state handling: while the mutation is pending, disable the submit button and show a `CircularProgress` spinner in its place | `AddMovieReviewPage.tsx` | Submit button is disabled and spinner appears during the API call |
| PT-8-3 | Add success/error feedback: on mutation success, show a MUI `Snackbar` with "Review saved"; on mutation error, show "Failed to save review — please try again" | `AddMovieReviewPage.tsx` | Snackbar appears after submission attempt with appropriate message |
| PT-8-4 | In `FavouriteMoviesPage.tsx`, for each movie in favourites, add a `useQuery(["api-reviews", movieId], () => getMovieReviewsFromAPI(movieId))` call and display the returned reviews below the movie card | `FavouriteMoviesPage.tsx`, `app-api.ts` | Reviews fetched from the API appear on the favourites page after a browser refresh |
| PT-8-5 | Verify persistence end-to-end: submit a review for a favourite movie, hard-refresh the browser (`Ctrl+Shift+R`), navigate to favourites — the review text must still appear | Browser | Review text visible after hard refresh confirms DynamoDB persistence |

---

### PT-9 Subtasks — Ordered Favourites

| ID | Action | Files | Done condition |
|---|---|---|---|
| PT-9-1 | Add `reorderFavourites(fromIndex: number, toIndex: number)` to `MoviesContext`. Implementation: create a new array copy, splice out the item at `fromIndex`, insert it at `toIndex`, call `setFavourites(newArray)`. Also write the updated array to `localStorage` inside this function. | `moviesContext.tsx` | Calling `reorderFavourites(0, 1)` swaps the first two favourites |
| PT-9-2 | On `MoviesContext` initialisation, read `favourites` from `localStorage` (if present) to restore order on refresh: `useState<number[]>(JSON.parse(localStorage.getItem("favourites") ?? "[]"))`. Also write to `localStorage` inside `addToFavourites` and `removeFromFavourites`. | `moviesContext.tsx` | After refresh, `favourites` array in context matches the `localStorage` value |
| PT-9-3 | In `FavouriteMoviesPage.tsx`, add up and down `IconButton` controls (`ArrowUpward`, `ArrowDownward` from `@mui/icons-material`) to each favourite movie card. The up button is disabled for the first item; the down button is disabled for the last item. Clicking calls `context.reorderFavourites(currentIndex, currentIndex ± 1)`. | `FavouriteMoviesPage.tsx` | Up/down arrows appear; clicking moves the card; the list reorders visually |
| PT-9-4 | Verify persistence: reorder favourites → refresh browser → confirm list is in the same order | Browser | Order preserved after hard refresh |

---

### PT-10 Subtasks — Themed Playlists

| ID | Action | Files | Done condition |
|---|---|---|---|
| PT-10-1 | Add `Playlist` type to `movieAppTypes.ts`: `{ id: string, title: string, theme: string, movieIds: number[] }` | `movieAppTypes.ts` | Type compiles without errors |
| PT-10-2 | Add `playlists: Playlist[]`, `addPlaylist(playlist: Playlist)`, and `addMovieToPlaylist(playlistId: string, movieId: number)` to `MoviesContext`. Persist `playlists` to `localStorage` on every change (same pattern as PT-9-2 for favourites). | `moviesContext.tsx` | `useContext(MoviesContext).playlists` is accessible and persists through refresh |
| PT-10-3 | Create `src/pages/PlaylistPage.tsx`. Read `playlists` from context. Render each as a MUI `Card` with title, theme, and a "View" button or `Link` to `/playlists/:id`. If no playlists, show an empty state message. | `PlaylistPage.tsx` (new) | `/playlists` renders existing playlists or an empty state message |
| PT-10-4 | Create `src/pages/PlaylistCreatePage.tsx`. Use `react-hook-form` for Title and Theme fields (both required). Add a movie search input (filter against the existing discover list or a separate `useQuery` call). Clicking a search result adds `movieId` to a local `selectedMovieIds` state array. On submit: create a new `Playlist` object with a unique id (`Date.now().toString()`), call `context.addPlaylist()`, navigate to `/playlists`. | `PlaylistCreatePage.tsx` (new) | Creating a playlist navigates back to the list page and the new playlist appears |
| PT-10-5 | Create a `PlaylistDetailPage.tsx` at `/playlists/:id`. Read `playlists` from context, find the matching id. Use `useQueries` to fetch movie details for each `movieId`. Render movies as read-only `MovieCard` components (no action prop). | `PlaylistDetailPage.tsx` (new) | `/playlists/:id` shows the correct movies for that playlist |
| PT-10-6 | Add routes to `src/index.tsx`: `/playlists`, `/playlists/:id` (public), `/playlists/create` (wrapped in `PrivateRoute`). Add "Playlists" to `SiteHeader` menu options. | `index.tsx`, `SiteHeader.tsx` | All three routes navigate correctly |

---

### PT-11 Subtasks — Fantasy Movie Advanced Form

| ID | Action | Files | Done condition |
|---|---|---|---|
| PT-11-1 | Add `CastMember` type to `movieAppTypes.ts`: `{ roleName: string, description: string }`. Add optional `cast: CastMember[]` and `posterUrl: string | null` fields to the `FantasyMovie` type. | `movieAppTypes.ts` | Types compile; existing Basic form still works (both fields are optional) |
| PT-11-2 | In `FantasyMovieForm/index.tsx`, below the existing fields, add a "Cast" section. Maintain a `castMembers` array in local state (separate from `react-hook-form` register, or use `useFieldArray` from `react-hook-form`). Render each entry as two `TextField` components (Role Name, Description) plus a remove `IconButton`. Add an "Add Cast Member" `Button` that appends a blank entry. | `FantasyMovieForm/index.tsx` | Add/remove cast member rows work; data included in the submitted form object |
| PT-11-3 | Add a poster section to the form: an `<input type="file" accept="image/*">` wrapped in a MUI `Button`. On `onChange`, use `FileReader.readAsDataURL()` to read the file and store the data URL in local state. Display an MUI `CardMedia` or `<img>` preview below the input once a file is selected. | `FantasyMovieForm/index.tsx` | Selecting an image file shows a preview in the form |
| PT-11-4 | Update `FantasyMovieCreatePage.tsx` to pass the `cast` array and `posterUrl` data URL into the `FantasyMovie` object before calling `context.addFantasyMovie()` | `FantasyMovieCreatePage.tsx` | Submitted fantasy movie object contains the cast list and poster URL |
| PT-11-5 | Update `FantasyMoviePage.tsx` to display cast members and the poster image preview for each saved fantasy movie | `FantasyMoviePage.tsx` | Fantasy movie list entries show cast names and poster image if present |

---

### PT-12 Subtasks — Outstanding Backend Persistence

| ID | Action | Files | Done condition |
|---|---|---|---|
| PT-12-1 | In Assignment 1 repo: create a new DynamoDB access pattern (GSI or new table) for favourites, keyed on `userId` (from JWT). Create `lambda/movies/addFavourite.ts` (PUT to DynamoDB) and `lambda/movies/getFavourites.ts` (query by userId). | A1 Lambda files (new) | Both Lambdas can be invoked via `cdk deploy` and tested with `curl` |
| PT-12-2 | In Assignment 1 repo: create `lambda/fantasyMovies/addFantasyMovie.ts` and `lambda/fantasyMovies/getFantasyMovies.ts`. Store and retrieve by userId. | A1 Lambda files (new) | Both Lambdas are invokable and return correct data shapes |
| PT-12-3 | In Assignment 1 repo CDK: register the four new Lambda functions, add routes (`POST/GET /movies/favourites`, `POST/GET /fantasy-movies`), attach the existing `requestAuthorizer`, grant DynamoDB permissions. Run `cdk deploy`. | `app-api.ts` (A1 repo) | All four routes return 200 for authenticated requests in Postman/curl |
| PT-12-4 | In `app-api.ts` (frontend), add `addFavourite(movieId)`, `getFavourites()`, `addFantasyMovie(movie)`, `getFantasyMovies()` functions using the Bearer token header | `app-api.ts` | Functions call the correct new endpoints |
| PT-12-5 | In `AuthContext.tsx`, after `signIn` is called, trigger `useQuery` (or a direct fetch) to `getFavourites()` and `getFantasyMovies()` and hydrate the corresponding `MoviesContext` arrays from the backend response | `AuthContext.tsx`, `moviesContext.tsx` | After sign in, favourites and fantasy movies loaded from DynamoDB appear in the UI |
| PT-12-6 | Replace `context.addToFavourites()` calls with a `useMutation` that calls both `addFavourite()` on the backend AND the local context action so the UI updates immediately while the backend persists asynchronously | `MovieCard.tsx`, `cardIcons/AddToFavourites.tsx` | DynamoDB console shows new favourite record after adding from the UI |
| PT-12-7 | Verify end-to-end: add a favourite and a fantasy movie → sign out → sign in → both are restored from the backend (not localStorage) | Browser + DynamoDB console | DynamoDB console screenshot shows the records; they appear in the UI after fresh sign-in |

---

## Task Dependencies

```
PT-0  (Backend Fix)
  └── PT-4  (Auth System)
        ├── PT-6  (TV Favourites — needs PrivateRoute)
        ├── PT-8  (Review Persistence — needs Bearer token)
        └── PT-12 (Outstanding — needs auth + reviews working)

PT-1  (Stubs) — no dependencies; do first
PT-2  (TV Entity) — no dependencies; can run in parallel with PT-1
  └── PT-6  (TV Favourites — needs TVCard + TVSeriesPage)

PT-3  (Fantasy Basic) — no dependencies after PT-1
  └── PT-11 (Fantasy Advanced — extends the Basic form)

PT-5  (Pagination) — no dependencies; standalone feature

PT-7  (Multi-Search) — no dependencies; extends existing filter pattern

PT-9  (Ordered Favourites) — no dependencies; extends MoviesContext

PT-10 (Playlists) — no dependencies; new context state + pages
  └── PT-4  (needs PrivateRoute for /playlists/create)
```

**Recommended implementation order:**

```
PT-0 → PT-1 → PT-2 → PT-3 → PT-4 → PT-5 → PT-6 → PT-7 → PT-8 → PT-9 → PT-10 → PT-11 → PT-12
```

Each task in this order builds on what came before without backtracking.

---

## Validation Coverage Map

| Acceptance Criterion | Parent Task | Subtask(s) |
|---|---|---|
| `/tv` renders TV cards from TMDB | PT-2 | PT-2-4, PT-2-7 |
| `/tv/:id` renders TV series detail | PT-2 | PT-2-6, PT-2-7 |
| Clicking TV card navigates to correct detail | PT-2 | PT-2-3, PT-2-8 |
| Sort control visibly reorders list | PT-1 | PT-1-1, PT-1-2 |
| Fantasy Movie form stores entry | PT-3 | PT-3-3, PT-3-4, PT-3-5 |
| No "Option 3"/"Option 4" in nav | PT-1 | PT-1-3, PT-1-4 |
| HeaderMovie uses MoviesContext not localStorage | PT-1 | PT-1-6 |
| myReviews exposed from context | PT-1 | PT-1-5 |
| Pagination: page 2 loads, page 1 stays visible | PT-5 | PT-5-3, PT-5-4, PT-5-5 |
| Auth flow: sign up → confirm → sign in → sign out | PT-4 | PT-4-4, PT-4-5, PT-4-6, PT-4-9 |
| PrivateRoute redirects unauthenticated user | PT-4 | PT-4-7, PT-4-8 |
| TV series added to favourites; visible on page | PT-6 | PT-6-2, PT-6-5 |
| Multi-criteria search narrows results | PT-7 | PT-7-2, PT-7-3, PT-7-4 |
| Review persists after page refresh | PT-8 | PT-8-1, PT-8-5 |
| Favourite order preserved after refresh | PT-9 | PT-9-1, PT-9-2, PT-9-4 |
| Playlist with 2+ movies visible on list page | PT-10 | PT-10-4, PT-10-3 |
| Fantasy Movie Advanced: cast + poster preview | PT-11 | PT-11-2, PT-11-3 |
| Favourites persist to DynamoDB | PT-12 | PT-12-6, PT-12-7 |
| Fantasy Movie persists to DynamoDB | PT-12 | PT-12-6, PT-12-7 |
