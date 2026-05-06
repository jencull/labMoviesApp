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