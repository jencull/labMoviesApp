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
  
  However, the filter on the TV Series page was showing 'Filter the Movies' and 'Sort the Movies' because it was reusing the MovieFilterUI component.
  
  To resolve this issue a new FilterTVSeriesCard.tsx and TVSeriesFilterUI components were created as TV versions of the movie filtering. 

  This issue was not covered in the task list because it wasn't specifically mentioned on the assignment spec and only became visible when testing in the browser window. 

  Takeaway: A task can't be generated for something the agent hasn't been informed of. But that spec was generated from within the project folder so the information (code) was available and it could have been asked as a clarifying question. 
  
  There were no clarifying questions asked at the time the SDD work was being done. (see prompt-enhancement-and-planning.md)

  Another issue to highlight here is that the final task was to add routes and see that everything worked. This student prefers to check more frequently. The TV Series route was added in PT-2-4, just to confirm functionality at that point in time. 



  









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