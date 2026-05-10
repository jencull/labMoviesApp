# Assignment 2 - 20096634

## PT-1-1 and PT-1-2: 

  * Coded filter sort function with Rating - high to low and Rating- low to high using vote_average because there are the exact same options available on the tv series endpoint. the pattern will be reusable and consistent across the application. 
  
  * Another option that can be used across both endpoints is most popular/least popular (popularity), that is an option if additional/different filtering options desired/required. 
  
  * Considered release dates but the movie endpoint uses release_date and the tv series uses first_air_date. 

  ## PT-1-3 and PT-1-4

  * replace Option 3 and Option 4 headings on Siteheader with
  TV Series and Fantasy Movies. 

  ## PT-1-5

  * Movie reviews were being saved but there was no way to read them back/display them. Adding myReviews to the context value so any componenet can now access it. This is needed later when reviews get saved to dynamoDB.

  ## PT-1-6

  * Favourites were being tracked in two ways, the heart icon on the movie details page (local storage) but the heart icon on the cards was reading from MoviesContext. Potential to get out of sync so made changes to HeaderMovie.tsx so there is a single source of truth (MoviesContext) for favourites across the application.

  ## PT-1-7

  * removed the useMovie hook as no longer in use now that react query caching is in place. 

  ## PT-2-1

  * Tv filtering options https://developer.themoviedb.org/reference/discover-tv

  * Tv series details https://developer.themoviedb.org/reference/tv-series-details

  * TV series images https://developer.themoviedb.org/reference/tv-series-images

  ## PT-2-2

  * added API

  ## PT-2-3

  * added TVCard.tsx. Some minor differences from MovieCard.tsx:
    * uses tvSeries.name (instead of movie.title)
    * uses tvSeries.first_air_date (instead of movie.release_date)
    * links to /tv/:id (instead of /movies/:id)
    * no favourites yet

  ## PT-2-4

  * added TVSeriesPage.tsx
  * useFiltering hook accidentally deleted in PT-1-7 when deleting useMovie hook. Reinstated. 
  * TV Series route added, not due to be added until PT-2-7 but current work wasn't able to be verified with npm run dev without the route in place.

  ## PT-2-5

  * TVDetails component added.

  ## PT-2-6

  * Added TVDetailsPage (page), TemplateTVPage and HeaderTV (components)

  ## PT-2-7

  * Added tv details route. 

  ## PT-2-8

  This task was to verify that everything worked as intended.

  ### Unexpected/unplanned work PT-2
  
  However, the filter on the TV Series page was showing 'Filter the Movies' and 'Sort the Movies' because it was reusing the MovieFilterUI component.
  
  To resolve this issue a new FilterTVSeriesCard.tsx and TVSeriesFilterUI components were created as TV versions of the movie filtering. 

  This issue was not covered in the task list because it wasn't specifically mentioned on the assignment spec and only became visible when testing in the browser window. 

  Takeaway: A task can't be generated for something the agent hasn't been informed of. But that spec was generated from within the project folder so the information (code) was available and it could have been asked as a clarifying question. 
  
  There were no clarifying questions asked at the time the SDD work was being done. (see prompt-enhancement-and-planning.md)

  Another issue to highlight here is that the final task was to add routes and see that everything worked. This student prefers to check more frequently. The TV Series route was added in PT-2-4, just to confirm functionality at that point in time. 

  ## PT-3-1

  * Add fantasy movie type

  ## PT-3-2

  * Expland moviesContext to allow for fantasy movies

  ## PT-3-3

  * create fantasy movie form. Not committed until 3-5 completed in order to check the form in the browser, similar to PT-2-8

  ## PT-3-4

* added FanatasyMovieCreatePage and route. Able to view the form on http://localhost:3000/fantasy-movie/create 

## PT-3-5 & PT-3-6

* Commited together in order to view the Fantasy Movie page and ensure it looks/works correctly
* Initially there was no way to link from the page to the form to create a movie. This wasn't listed as a task in the generated task list. The page only contained the text "My Fantasy Movies. No fantasy movies yet. Create one!"
* Created a button, similar to the one on reviewForm with the text "Create Fantasy Movie" and linked it to the form. 

### Unexpected/unplanned work in PT-3

* Another gap here, in this students opinion, is the lack of caching/storage on the page. It wasn't listed any of the tasks and persisting to AWS is in the 90+ range. Local storage for ordered movies comes in PT-9 but no mention of it for Fantasy Movies. 
* Created local storage for created fantasy movies, completed in this commit using this tutorial
https://felixgerschau.com/react-localstorage/

PT-0

* Backend integration done to allow movie reviews be stored on aws. Sample file,  .env.sample, is provided to show how this is hooked up with the App and auth endpoints from aws and the vite key. The .env file will not be pushed to github for security reasons. 

## PT-4-1

* Add AuthContext for sign in, sign out and storing token

## PT-4-2

* Import AuthContext to index and wrap the app with it, then all pages/components have access

## PT-4-3

* Created an app-api file using tmdb-api as a guide. 
* Addded a getAuthHeader helper that checks localStorage for the token and adds it to requests to our backend
* 3 new functions, addReview, getMovieReviewsFromAPI and updateReview use the above to make authenticated requests to Assign1 API (in the .env file), where the reviews are/will be stored
* Confirmed connection via curl command with AI assistance, see verify-backend-connection.md

## PT-4-4

* Using the reviewForm/index as a guide, implemented the sign in page. 
* on signin it posts to the auth/signin endpoint, if successful stores the token in AuthContext and redirects to home
* register button goes nowhere yet because the signup route doesn't exist, will build a signup page in next section"

## PT-4-5

* Similar to signin page but with 3 fields, username, pw and email
* Pw validation set with min 8 chars with uppercase, lowecase and a symbol required (like 'rules' in reviewForm). Cognito enforces this on the backend. 
* Success directs to /confirm (next section), passing username in location.state. No AuthContext needed here. 
* Add signup route. 
* Register button on signin page now directs to signup page. 

## PT-4-6

* New page for confirm signup. The user gets a code from AWS and will enter the code here to verify the registration.
* Username is prefilled using location.state, used addMovieReviewPage as a guide for this.
* Success directs to /signin. 
* Add route for ConfirmSignUpPage

## PT-4-7 & PT-4-8

* Created PrivateRoute component. Calls isAuthenticated from AuthContext so if a user tries to access content but is not logged in it redirects to signin page.
* https://stackoverflow.com/questions/69923420/how-to-use-private-route-in-react-router-domv6
* Wrap protected routes in index.tsx (4-8)

## PT-4-9

* Show/hide buttons on site header depending on if a user is logged in or not. Has to be added to normal header and responsive (mobile) header. Conditional rendering: https://react.dev/learn/conditional-rendering
* When logged in the username will be visible and a signout option available.
* When logged out the sign in option will show.
* Signout calls the signout endpoint and deletes the stored token

## PT-4-10 & PT-4-11

* Routes & .env.example : both completed during earlier steps in order to view pages as they were build and explain .env security matters. 

## PT-5-1

* Updated getMovies in tmdb-api to accept page param to enable pagination

## PT-5-2

* Added new type PaginatedMovieResults to movieAppTypes to handle pagination. Chose a new type rather than editing DiscoverMoviesProps to keep other functionality working as before.

## PT-5-3

* Added a page number variable to HomePage that changes when a user selects a different page
* The page number is included in the key and is passed to the API so TMDB knows which page to send back
* Implemented keepPreviousData so the movies already on screen stay visible while the new page is being called, no white screen while waiting. 
* https://tanstack.com/query/latest/docs/framework/react/examples/pagination

## PT-5-4

* Add MUI pagination on bottom of home page - users can navigate between pages with different content being returned
* https://stackoverflow.com/questions/64340077/getting-value-from-material-ui-pagination


## PT-6-1

* Prep moviesContextPage to support  TV series favourites, added tvFavourties, addToTVFavourites and removeFromTVFavourites, same pattern as for movies.

## PT-6-2

* Created AddTVToFavourites cardIcon using the AddToFavourites as a template






  









# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


npm install
npm run dev
http://localhost:3000/