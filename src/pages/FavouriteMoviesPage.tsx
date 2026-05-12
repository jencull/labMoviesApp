import { useContext } from "react"
import PageTemplate from "../components/TemplateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import { getMovieReviewsFromAPI } from "../api/app-api";
import Spinner from "../components/Spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/MovieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/RemoveFromFavourites";
import WriteReview from "../components/cardIcons/WriteReview";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";


const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const FavouriteMoviesPage = () => {
  const { favourites: movieIds, reorderFavourites } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  // Same useQuery pattern as above, but getting reviews from API
  // for each favourite movie. Each query uses the key movieId so
  // react-query caches them separately.
  const reviewQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["api-reviews", movieId],
        queryFn: () => getMovieReviewsFromAPI(movieId),
      };
    })
  );

  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const displayedMovies = allFavourites
    ? filterFunction(allFavourites)
    : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayedMovies}
        action={(movie) => {
          const index = movieIds.indexOf(movie.id!);
          return (
            <>
              <RemoveFromFavourites {...movie} />
              <WriteReview {...movie as any} />
              <IconButton
                aria-label="move up"
                onClick={() => reorderFavourites(index, index - 1)}
                disabled={index === 0}
              >
                <ArrowUpward fontSize="large" />
              </IconButton>
              <IconButton
                aria-label="move down"
                onClick={() => reorderFavourites(index, index + 1)}
                disabled={index === movieIds.length - 1}
              >
                <ArrowDownward fontSize="large" />
              </IconButton>
            </>
          );
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        yearFilter=""
        minRatingFilter=""
        languageFilter=""
      />
      <Box sx={{ mt: 4, px: 2 }}>
        <Typography variant="h4" gutterBottom>Reviews</Typography>
        {movieIds.map((movieId, index) => {
          const movie = allFavourites[index];
          // Backend returns { data: [{ movieID, reviewerID, date, text }] }
          // error that prevented reviews working correctly
          const reviews = reviewQueries[index]?.data?.data ?? [];
          if (!reviews.length) return null;
          return (
            <Box key={movieId} sx={{ mb: 3 }}>
              <Typography variant="h6">{movie?.title}</Typography>
              {reviews.map((review: { reviewerID: string; date: string; text: string }) => (
                <Box key={review.reviewerID} sx={{ ml: 2, mb: 1 }}>
                  <Typography variant="subtitle2">{review.reviewerID} — {review.date}</Typography>
                  <Typography variant="body2">{review.text}</Typography>
                </Box>
              ))}
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default FavouriteMoviesPage;
