import { useParams } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";
import PageTemplate from "../components/TemplateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/Spinner';
import { MovieDetailsProps } from "../types/movieAppTypes";

const MovieDetailsPage = () => {
   const { id } = useParams();
  const { data: movie, error, isLoading, isError } = useQuery<MovieDetailsProps, Error>(
    ["movie", id],
    ()=> getMovie(id||"")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  return (
    <>
      {movie ? (
        <>
        <PageTemplate movie={movie}>
          <MovieDetails {...movie} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for movie details</p>
    )}
    </>
  );
};

export default MovieDetailsPage;
