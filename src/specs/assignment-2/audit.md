# Assignment 2 — Planning Audit

**Source spec:** `src/specs/assignment-2/spec.md`
**Source tasks:** `src/specs/assignment-2/tasks.md`
**Audit date:** 2026-05-06

---

## Purpose

This audit validates the task plan against the spec before implementation begins.
It flags risks, dependency issues, missing coverage, and explainability concerns
that should be resolved or acknowledged before running `/SDD-3-manage-tasks`.

---

## Spec Coverage Check

Every acceptance criterion in the spec must trace to at least one parent task.

| # | Acceptance Criterion | Tier | Covered by | Status |
|---|---|---|---|---|
| 1 | `/tv` renders TV cards from TMDB | Good | PT-2 | ✅ |
| 2 | `/tv/:id` renders TV detail | Good | PT-2 | ✅ |
| 3 | TV card links to correct detail page | Good | PT-2 | ✅ |
| 4 | Sort control reorders movie list | Good | PT-1 | ✅ |
| 5 | Fantasy Movie Basic form stores entry | Good | PT-3 | ✅ |
| 6 | No "Option 3"/"Option 4" nav links | Good | PT-1 | ✅ |
| 7 | HeaderMovie uses MoviesContext not localStorage | Good | PT-1 | ✅ |
| 8 | myReviews exposed from context | Good | PT-1 | ✅ |
| 9 | Pagination — page 2 loads; page 1 stays visible | Very Good | PT-5 | ✅ |
| 10 | Auth flow works end-to-end | Very Good | PT-4 | ✅ |
| 11 | PrivateRoute redirects unauthenticated user | Very Good | PT-4 | ✅ |
| 12 | TV Favourites — add series, view on favourite page | Very Good | PT-6 | ✅ |
| 13 | Multi-search — 2+ criteria narrow results | Very Good | PT-7 | ✅ |
| 14 | Review persists after full browser refresh | Excellent | PT-8 | ✅ |
| 15 | Favourite order preserved after refresh | Excellent | PT-9 | ✅ |
| 16 | Playlist created and visible on list page | Excellent | PT-10 | ✅ |
| 17 | Fantasy Movie Advanced: cast + poster preview | Excellent | PT-11 | ✅ |
| 18 | Favourites persist to DynamoDB | Outstanding | PT-12 | ✅ |
| 19 | Fantasy Movie persists to DynamoDB | Outstanding | PT-12 | ✅ |

**Result: All 19 acceptance criteria are covered. No gaps.**

---

## Dependency Chain Audit

### Critical path

```
PT-0 (CORS fix) → PT-4 (Auth) → PT-8 (Review persistence) → PT-12 (Outstanding)
```

This is the longest dependency chain and contains the highest-risk tasks.
All three tasks in this chain require external infrastructure changes.
If PT-0 is delayed (e.g. Cognito user pool lost, CDK deploy fails), PT-4, PT-8,
and PT-12 cannot be completed or tested.

### Dependency violations to avoid

| Risk | Task pair | Mitigation |
|---|---|---|
| Implementing auth UI before backend CORS fix | PT-4 before PT-0 | PT-0 must be deployed and verified (PT-0-7 curl check) before any PT-4 UI testing in browser |
| Adding TV Favourites before TVCard exists | PT-6 before PT-2 | TVCard render-prop action slot must exist (PT-2-3) before PT-6-2/PT-6-3 |
| Wiring review mutation before app-api.ts exists | PT-8 before PT-4-3 | `app-api.ts` is created at PT-4-3; PT-8 imports from it |
| Wrapping PrivateRoute before it exists | PT-4-8 before PT-4-7 | Create the component (PT-4-7) before wrapping routes (PT-4-8) |
| Extending Fantasy Movie Advanced before Basic works | PT-11 before PT-3 | PT-3 must be complete and the form rendering correctly |

### Parallelisable tasks (safe to work on simultaneously if time permits)

- PT-1 and PT-2 have no shared dependencies and touch different files
- PT-3 and PT-5 are independent — PT-3 uses context, PT-5 uses react-query only
- PT-7 and PT-9 are independent of each other and of the auth chain
- PT-10 and PT-11 are independent of each other

---

## Risk Flags

### 🔴 HIGH — CORS and backend deploy (PT-0)

**Risk:** If PT-0 fails (CDK deploy error, Cognito user pool deleted and emails
lost, AWS credentials expired), the entire auth integration chain is blocked.

**Mitigation:**
1. Run `npx cdk synth` before `cdk deploy` to catch CDK errors locally.
2. Verify `CDK_DOCKER=podman` is set (per Assignment 1 student notes) on Podman-based machines.
3. If the user pool was deleted, create a fresh test account with a reachable email.
4. Keep PT-0-7 (the curl verification) as a hard gate — do not proceed to PT-4
   until that curl command returns the correct CORS headers.
5. If using CloudFront later, update `allowOrigins` to include the CloudFront
   domain at that time.

---

### 🔴 HIGH — `Content-Length` header on POST /movies/reviews (PT-8)

**Risk:** The Assignment 1 API Gateway validation rejects `POST /movies/reviews`
without a `Content-Length` header, returning "Invalid request body" silently in
the browser. This is a known quirk documented in the Assignment 1 README.

**Mitigation:**
- PT-4-3 (creating `app-api.ts`) must include `Content-Length` computation using
  `new TextEncoder().encode(JSON.stringify(body)).length` in `getAuthHeader()`.
- Test `addReview()` directly in the browser console (network tab) before wiring
  it to the form, to confirm the API returns 200 rather than 400.
- If a 400 "Invalid request body" is returned, the first thing to check is whether
  `Content-Length` is present in the request headers.

---

### 🟡 MEDIUM — react-query v3 vs v4/v5 API differences (PT-5)

**Risk:** The installed version is `react-query@^3.39.3`. Pagination in v3 uses
`keepPreviousData: true` in the query options. V4/v5 renamed this to
`placeholderData: keepPreviousData`. Using the wrong API causes the "blank flash"
on page change — the spec's pagination feature will fail its acceptance criterion.

**Mitigation:**
- Confirm the installed version: `cat moviesApp/package.json | grep react-query`.
- At PT-5-3, use exactly: `useQuery(["discover", page], () => getMovies(page), { keepPreviousData: true })`.
- Do NOT use `placeholderData`.
- If the app is ever upgraded to v4/v5, this is the first thing to fix.

---

### 🟡 MEDIUM — Token expiry during demo (PT-4, PT-8)

**Risk:** The Assignment 1 Cognito JWT expires after 3600 seconds (1 hour). An
expired token causes `POST /movies/reviews` and other protected endpoints to
return 401. The frontend currently has no token refresh mechanism (out of scope).

**Mitigation:**
- During testing and demo recording, sign in freshly within the session.
- If a 401 is received during testing, sign out and sign in again to get a fresh token.
- Optionally add a simple check: if any `app-api.ts` call returns `{ statusCode: 401 }`,
  call `context.signOut()` and `navigate("/signin")`. This is a lightweight guard
  and worth adding at PT-4-3.

---

### 🟡 MEDIUM — TV field name differences from movies (PT-2)

**Risk:** TV series use `name` (not `title`) and `first_air_date` (not
`release_date`). Using movie field names in TV components will silently render
undefined values — no TypeScript error if the type is `any` or if the fields
are optional.

**Mitigation:**
- PT-2-1 must define `TVSeriesOverview` with `name` and `first_air_date` as
  required fields.
- `TVCard.tsx` must reference `tvSeries.name` not `tvSeries.title`.
- `TVDetailsPage.tsx` must reference `tvSeries.first_air_date`.
- After PT-2-6, manually navigate to `/tv/1399` (Game of Thrones) and confirm
  the series name appears correctly in the header.

---

### 🟡 MEDIUM — PrivateRoute and the `/tv/favourites` static vs dynamic route conflict (PT-4, PT-6)

**Risk:** React Router v6 resolves `/tv/favourites` before `/tv/:id` if routes
are ordered correctly, but if `/tv/:id` is listed first in the `Routes` block,
`favourites` will be treated as an id parameter. The app will attempt to fetch
a TV series with id `"favourites"` and fail silently.

**Mitigation:**
- In `src/index.tsx`, place the static route `/tv/favourites` **before** the
  parameterised route `/tv/:id`:
  ```tsx
  <Route path="/tv/favourites" element={<PrivateRoute><FavouriteTVPage /></PrivateRoute>} />
  <Route path="/tv/:id" element={<TVDetailsPage />} />
  ```
- The same issue already exists for `/movies/favourites` vs `/movies/:id` in the
  baseline — verify that it is also ordered correctly.

---

### 🟡 MEDIUM — `getMovies()` return shape change breaks existing consumers (PT-5)

**Risk:** PT-5-1 changes `getMovies()` from returning `results[]` to returning
`{ results, total_pages }`. This is a breaking change for `FavouriteMoviesPage`
if it uses `useQueries` with the same function, and potentially for any other
consumer.

**Mitigation:**
- After changing `getMovies()`, run TypeScript compilation (`npm run build`) to
  catch all type errors before testing in the browser.
- `FavouriteMoviesPage` uses `getMovie(id)` (single movie, not `getMovies()`),
  so it is unaffected — but verify this before making the change.
- If other consumers break, they need to be updated to destructure `data.results`
  instead of using `data` directly.

---

### 🟢 LOW — Dead code hook (`useMovie`) (PT-1)

**Risk:** The `useMovie` hook is dead code. Leaving it in the submission is a
minor mark risk (assessor may note it as unfinished) and a linter warning.

**Mitigation:**
- At PT-1-7: if `useMovie` fetches a single movie by id, it could be reused in
  `TVDetailsPage` (which fetches a single TV series by id — same pattern). If
  it is generalised to accept a fetch function, it avoids duplication.
- If it cannot be cleanly reused, delete the file. A deleted file is better than
  an unused one in a submission context.

---

### 🟢 LOW — `.env` committed by accident (PT-4)

**Risk:** `VITE_AUTH_API` and `VITE_APP_API` contain live AWS API Gateway URLs.
If `.env` is committed, the API URLs are exposed in the public repo.

**Mitigation:**
- PT-4-11 creates `.env.example` and confirms `.env` is in `.gitignore`.
- Run `git status` before every commit and verify `.env` is not listed as staged.
- Note: TMDB API key (`VITE_TMDB_KEY`) is also sensitive — confirm it is already
  in `.gitignore` from the baseline.

---

### 🟢 LOW — `console.log` in `addToMustWatch` (existing baseline)

**Risk:** A `console.log("Must Watch List:", ...)` exists in `moviesContext.tsx`
line 54. This is baseline noise and will appear in the demo video's browser
console, which is a minor presentation issue.

**Mitigation:** Remove the `console.log` at PT-1 when touching `moviesContext.tsx`.

---

## Explainability Audit

The assignment explicitly states: *"Any code, feature, component, pattern, or
design decision that you cannot clearly explain and justify may result in a
penalty in grading."*

The following items require extra study if AI assistance was used to generate them,
as they are the most likely topics for a Zoom interview:

| Topic | What you must be able to explain |
|---|---|
| `keepPreviousData: true` | Why this option prevents a blank flash; what "stale" data means in react-query v3; what happens without it |
| `useQueries` in FavouriteMoviesPage | Why `useQueries` is used instead of a single `useQuery`; how cache keys are shared with individual movie pages |
| `AuthContext` token storage in `localStorage` | Why `localStorage` is used; why it's acceptable for an academic project; why `httpOnly` cookies would be better in production |
| `PrivateRoute` component | How React Router v6 `<Navigate replace />` works; why `replace` prevents the back button from returning to the protected route |
| `Content-Length` header computation | What `TextEncoder` does; why the API Gateway validator requires this header; why Postman doesn't need it explicitly |
| `react-hook-form` `useFieldArray` | How dynamic form arrays work; what `fields`, `append`, and `remove` do; why this is better than manual state array management |
| `FileReader.readAsDataURL()` | What a data URL is; why no server upload is needed; the size limitation of storing images as data URLs in state/localStorage |
| Bearer token vs cookie auth | What the difference is; why cookies are blocked by CORS in this setup; why Bearer tokens work cross-origin |
| CORS preflight and OPTIONS | What a preflight request is; why `Access-Control-Allow-Credentials` cannot be combined with `*` origin; what the browser actually checks |
| CDK `RequestAuthorizer` | What `identitySources` does; how the Lambda receives the token from the header; what the authoriser returns (Allow/Deny policy) |

---

## Missing Coverage Check

### Features in spec NOT yet covered by tasks

After cross-referencing the spec "In Scope" section against the task list:

| Feature | Spec Section | Status | Note |
|---|---|---|---|
| "Discover" and "Home" duplicate nav links | Starting Point stubs | Not explicitly tasked | Not listed as a stub in the spec. The existing baseline has both going to `/`. No action required unless the assessor flags it — consider removing "Discover" at PT-1-3/PT-1-4 when replacing "Option 3"/"Option 4" |
| Genre chips hyperlinking (Very Good) | TV Entity → Data hyperlinking | Not a dedicated task | Mentioned as "Very Good" tier — can be added as a PT-2 subtask (PT-2-9) or a PT-7 subtask after multi-search if time allows. Low risk if omitted. |
| Extensive data hyperlinking (Very Good) | In Scope → Very Good | Partially covered by PT-2-8 and PT-7 | A full audit of all clickable genre/actor chips is outside the strict task scope — add as a sweep task after PT-7 if desired |
| `.env.example` file | Non-Functional Requirements | PT-4-11 | Covered |
| README update | Evidence Required | Not explicitly tasked | Should be added as a non-code task at the end of each tier: update README as part of tier completion. Add as sub-task to PT-3, PT-7, PT-11, and PT-12. |
| AIUSAGE.md update | NFR, Evidence Required | Not explicitly tasked | Same as README — add ongoing update reminders. At minimum, update after each major tier. |

---

## Planning Audit Gates

The following gates must pass before `/SDD-3-manage-tasks` execution begins:

| Gate | Condition | Status |
|---|---|---|
| G-1 | All 19 acceptance criteria traced to at least one task | ✅ Passed |
| G-2 | Dependency chain is documented and has no cycles | ✅ Passed |
| G-3 | PT-0 (backend fix) is identified as a hard blocker with a verification step | ✅ Passed |
| G-4 | react-query v3 pagination pattern (`keepPreviousData`) is correctly specified | ✅ Passed |
| G-5 | `Content-Length` requirement on review POST is documented and addressed in PT-4-3 | ✅ Passed |
| G-6 | PrivateRoute route ordering risk (static before dynamic) is documented | ✅ Passed |
| G-7 | `getMovies()` breaking shape change risk is documented with a TypeScript build check | ✅ Passed |
| G-8 | Security: `.env` gitignore and `.env.example` are in the task plan | ✅ Passed |
| G-9 | Explainability risk table identifies the 10 most likely interview topics | ✅ Passed |
| G-10 | README and AIUSAGE.md updates are flagged as missing subtasks | ⚠️ Flagged — add as subtasks manually |

---

## Recommended Actions Before Starting PT-1

1. **Run the baseline** — confirm `npm run dev` starts without TypeScript errors
   on the Lab 4/5 codebase before any Assignment 2 changes.

2. **Start PT-0 immediately** — the CORS fix and `cdk deploy` takes time (AWS
   deploy can take 5–10 minutes). Begin it in a separate terminal while reading
   through PT-1.

3. **Add README/AIUSAGE update subtasks** — add `PT-3-7 (update README with
   Good tier features)`, `PT-7-5 (update README with Very Good tier features)`,
   `PT-11-6 (update README with Excellent tier features)`, `PT-12-8 (final
   README and AIUSAGE.md update for submission)`.

4. **Decide on `useMovie` hook fate** — before PT-1-7, decide: reuse in TV
   pattern (saves ~10 lines) or delete (cleaner). Either is fine; do not leave
   it as dead code.

5. **Confirm installed react-query version** — run
   `cat moviesApp/package.json | grep react-query` to confirm `^3.x` before
   writing any pagination code.
