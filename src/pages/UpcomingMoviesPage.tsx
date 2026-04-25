import { useState, useEffect } from "react";
import PageTemplate from '../components/TemplateMovieListPage';
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import { getUpcomingMovies } from "../api/tmdb-api";
//import AddToFavouritesIcon from "../components/cardIcons/AddToFavourites";
import AddToPlaylistIcon from "../components/cardIcons/PlaylistAdd"

const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState<DiscoverMovieOverviewProps[]>([]);

  useEffect(() => {
    getUpcomingMovies().then(upcomingMovies => {
      setMovies(upcomingMovies);
    });
  }, []);

  // return (
  //   <PageTemplate
  //     title='Upcoming Movies'
  //     movies={movies}
  //     action={(movie) => {
  //       return <AddToFavouritesIcon {...movie} />
  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon {...movie} />
      }}
    />
  );
};

export default UpcomingMoviesPage;
