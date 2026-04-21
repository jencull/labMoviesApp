import { useState, useEffect } from "react";
import PageTemplate from '../components/TemplateMovieListPage';
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMoviesPage = () => {
  // Initialize with an empty array (like Home Page)
  const [movies, setMovies] = useState<DiscoverMovieOverviewProps[]>([]);
  
  // Add the same favorite logic so functionality is continued
  const addToFavourites = (movieId: number) => {
    const updatedMovies = movies.map((m: DiscoverMovieOverviewProps) =>
      m.id === movieId ? { ...m, favourite: true } : m
    );
    setMovies(updatedMovies);
  };

  useEffect(() => {
    getUpcomingMovies().then(upcomingMovies => {
      // add the 'favourite' property so the UI doesn't break
      const moviesWithFavourites = upcomingMovies.map((m: any) => ({
        ...m,
        favourite: false,
      }));
      setMovies(moviesWithFavourites);
    });
  }, []);

  // check to see if any upcoming movies are favourited
  const favourites = movies.filter(m => m.favourite);
  
  // save them localStorage so the Favourites page can find them
  localStorage.setItem('favourites', JSON.stringify(favourites));

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      selectFavourite={addToFavourites}
    />
  );
};

export default UpcomingMoviesPage;
