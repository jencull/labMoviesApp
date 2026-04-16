import { useState, useEffect } from "react";
import PageTemplate from '../components/TemplateMovieListPage';
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import { getMovies } from "../api/tmdb-api";

const HomePage = () => {
  const [movies, setMovies] = useState<DiscoverMovieOverviewProps[]>([]);
  
  // Logic to sync favourites to localStorage
  const favourites = movies.filter(m => m.favourite);
  localStorage.setItem('favourites', JSON.stringify(favourites));

  const addToFavourites = (movieId: number) => {
    const updatedMovies = movies.map((m: DiscoverMovieOverviewProps) =>
      m.id === movieId ? { ...m, favourite: true } : m
    );
    setMovies(updatedMovies);
  };

  useEffect(() => {
    getMovies().then(movies => {
      // Note: If getMovies() returns the raw API response, 
      // you may need to map them here to add the 'favourite' property
      // e.g., setMovies(movies.map((m: any) => ({ ...m, favourite: false })));
      setMovies(movies);
    });
  }, []); // Only runs once on mount

  return (
    <PageTemplate
      title='Discover Movies'
      movies={movies}
      selectFavourite={addToFavourites}
    />
  );
};

export default HomePage;
