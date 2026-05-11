# PT-0 debugging backend integration for reviews
_Exported on 5/11/2026 at 16:42:55 GMT+1 from Cursor (3.3.30)_

**User**

ok, i tried to submit a review and got the failed to save review message. I had an issue previously with CORS and said I would come back to PT-0. I suspect this is the same issue. 

---

**Cursor**

Most likely cause is you're not signed in — the backend API requires a JWT token in the request header, and if you're not logged in there's no token in `localStorage`.

Check two things:

1. **Are you signed in?** Look at the site header — if there's no "Sign out" option visible, you're not authenticated. Sign in first, then try submitting the review again.

2. **If you are signed in**, open browser DevTools → Network tab → find the failed POST to `/reviews` → click it and check the response body. It will tell you exactly what the backend rejected. Share what it says and I can pinpoint the issue.

---

**User**

it says I can sign out but maybe I have to manually sign in each time I do npm run dev to get a new cognito token? This is the error when I inspect the app: Access to fetch at 'https://bxyo83ajh8.execute-api.eu-west-1.amazonaws.com/prod/reviews/1226863' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
bxyo83ajh8.execute-api.eu-west-1.amazonaws.com/prod/reviews/1226863:1  Failed to load resource: net::ERR_FAILED
chunk-7QRRERWQ.js?v=a0569ee5:961 TypeError: Failed to fetch
    at getMovieReviewsFromAPI (app-api.ts:24:12)
    at Object.queryFn (FavouriteMoviesPage.tsx:53:24)
    at Object.fetchFn2 [as fn] (chunk-7QRRERWQ.js?v=a0569ee5:920:33)
    at run2 (chunk-7QRRERWQ.js?v=a0569ee5:545:35)
    at chunk-7QRRERWQ.js?v=a0569ee5:585:15
onError @ chunk-7QRRERWQ.js?v=a0569ee5:961
:3000/movies/favourites:1 Access to fetch at 'https://bxyo83ajh8.execute-api.eu-west-1.amazonaws.com/prod/reviews/1318447' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
bxyo83ajh8.execute-api.eu-west-1.amazonaws.com/prod/reviews/1318447:1  

---

**Cursor**

Two separate issues here:

**1. CORS error (the main problem)** — The GET request to `/reviews/{movieId}` is being blocked because your backend API Gateway doesn't have CORS headers configured for that endpoint. This is a backend fix needed in your CDK code — the Lambda response needs to include `Access-Control-Allow-Origin: *` headers, and the API Gateway needs to handle the preflight OPTIONS request.

**2. Cognito token** — Yes, Cognito access tokens expire (typically after 1 hour). Each time you restart the app you'll need to sign in again to get a fresh token. That's normal behaviour.

**For the CORS fix** — do you have access to your CDK code? The fix is adding CORS configuration to the reviews route in your CDK stack. Something like:

```typescript
reviewsResource.addCorsPreflight({
  allowOrigins: ["http://localhost:3000"],
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "OPTIONS"],
});
```

---

**User**
its already set to that, I did this at the very beginning of the project, I have the repo open in another window, can you see it?

---

**Cursor**
No, I can only see the workspace that's open in this window. Each Cursor window is a separate context — I can't see across windows.

To let me access both, either:

1. **Add folder to this workspace** — in this window, go to **File → Add Folder to Workspace** and select your backend repo folder. Then I can read both repos here.
2. **Paste the Lambda code** — find the Lambda function for `GET /reviews/{movieId}` and paste it into the chat here.

Option 1 is easier if you want me to navigate the backend repo freely.

---

**User**
ok, i have added the backend repo to the workspace now, can you see it now?

---

**Cursor**
Yes, I can see it now. Let me find the reviews Lambda functions. I can see multiple issues. Let me also check the CDK routing to understand the full picture.

Found multiple issues. Here's the full picture:

**Problem 1 — Wrong URL endpoints (frontend)**
* Frontend POSTs to `/reviews` → backend route is `POST /movies/reviews`
* Frontend GETs from `/reviews/{movieId}` → backend route is `GET /movies/{movieID}/reviews`

**Problem 2 — Wrong request body fields (frontend)**
* The backend requires `movieID` (uppercase D), `date`, and `text`. Your frontend sends `movieId` (lowercase d), `content`, and no `date`.

**Problem 3 — Lambda auth reads cookies, frontend sends Bearer header**
* `addReview` Lambda reads token from cookies (`parseCookies`) but your frontend sends `Authorization: Bearer <token>`. 

**Problem 4 — CORS headers missing from Lambda responses (backend)**
* Lambda responses don't include `Access-Control-Allow-Origin`.

All four need fixing. The frontend URL and field name fixes are in `app-api.ts` and `reviewForm/index.tsx`. The Lambda CORS and auth fixes require a backend redeploy.

---

**User**
I need it explained in more detail please. Can you check the authorizer and the lambda files specifically to see exactly how to fix the auth and CORS issues?

---

**Cursor**
Now that I've looked at the specific code in the files, I have the full picture. The authorizer itself also reads from cookies — but the CDK has it listening on the `Authorization` header. So the whole auth chain is broken: the frontend sends a Bearer token, the authorizer ignores it and looks for a cookie, finds nothing, and denies the request.

Four files need fixing in the backend:
1. `authorizer.ts` — Update to read from `Authorization` header instead of cookies.
2. `addReview.ts` — Remove cookie check + add CORS headers to all return objects.
3. `updateReview.ts` — Remove cookie check + add CORS headers to all return objects.
4. `getMovieReviews.ts` — Add CORS headers (it's public, so no auth changes needed).

Now update the remaining responses in those files to include the CORS header. Once that's done, run `cdk deploy` in the backend repo.




