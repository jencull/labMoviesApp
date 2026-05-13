import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import PageTemplate from "../components/TemplateMovieListPage";
import Spinner from "../components/Spinner";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const PlaylistDetailPage = () => {
  const { id } = useParams();
  const { playlists } = useContext(MoviesContext);

  const playlist = playlists.find((pl) => pl.id === id);

  // one query per movie in the playlist, same pattern as FavouriteMoviesPage
  const movieQueries = useQueries(
    (playlist?.movieIds ?? []).map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  if (!playlist) {
    return (
      <Container sx={{ paddingTop: 4 }}>
        <Typography variant="h5">Playlist not found.</Typography>
      </Container>
    );
  }

  const isLoading = movieQueries.find((q) => q.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = movieQueries.map((q) => q.data);

  return (
    <PageTemplate
      title={playlist.title}
      movies={movies}
      // no action needed - playlist detail is read only
      action={() => null}
    />
  );
};

export default PlaylistDetailPage;
