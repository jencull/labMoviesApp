//import { useState, useEffect } from "react";
import PageTemplate from '../components/TemplateMovieListPage';
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import { getUpcomingMovies } from "../api/tmdb-api";
//import AddToFavouritesIcon from "../components/cardIcons/AddToFavourites";
import AddToPlaylistIcon from "../components/cardIcons/PlaylistAdd"
import { useQuery } from "react-query";
import Spinner from "../components/Spinner";

const UpcomingMoviesPage = () => {
  const { data: movies, isLoading } = useQuery<DiscoverMovieOverviewProps[], Error>("upcoming", getUpcomingMovies);

  if (isLoading) {
    return <Spinner />;
  }

  const displayedMovies = movies || [];

  // return (
  //   <PageTemplate
  //     title='Upcoming Movies'
  //     movies={movies}
  //     action={(movie) => {
  //       return <AddToFavouritesIcon {...movie} />
  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={displayedMovies}
      action={(movie) => {
        return <AddToPlaylistIcon {...movie} />
      }}
    />
  );
};

export default UpcomingMoviesPage;
