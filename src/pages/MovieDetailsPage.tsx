import { useParams } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";
import useMovie from "../hooks/useMovie";
import PageTemplate from "../components/TemplateMoviePage";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie] = useMovie(id ?? "");

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
