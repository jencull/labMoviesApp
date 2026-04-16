import PageTemplate from "../components/TemplateMovieListPage";

const FavouriteMoviesPage = () => {
    const toDo = () => true;
    // Get movies from local storage.
    const movies = JSON.parse(localStorage.getItem("favourites") || '[]');
  
    return (
      <PageTemplate
        title="Favourite Movies"
        movies={movies}
        selectFavourite={toDo}
      />
    );
}

export default FavouriteMoviesPage
