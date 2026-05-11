import PageTemplate from '../components/TemplateMovieListPage';
import { DiscoverMovieOverviewProps, PaginatedMovieResults } from "../types/movieAppTypes";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  yearFilter,
  minRatingFilter,
  languageFilter,
} from "../components/MovieFilterUI";
import { useQuery } from "react-query";
import Spinner from "../components/Spinner";
import AddToFavouritesIcon from '../components/cardIcons/AddToFavourites';
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";


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
const yearFiltering = {
  name: "year",
  value: "0",
  condition: yearFilter,
};
const minRatingFiltering = {
  name: "minRating",
  value: "0",
  condition: minRatingFilter,
};
const languageFiltering = {
  name: "language",
  value: "all",
  condition: languageFilter,
};

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<PaginatedMovieResults, Error>(
    ["discover", page],
    () => getMovies(page),
    { keepPreviousData: true }
  );
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering, yearFiltering, minRatingFiltering, languageFiltering]
  );
  const [sortOption, setSortOption] = useState("none");

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  const changeFilterValues = (type: string, value: string) => {
    if (type === "sort") {
      setSortOption(value);
      return;
    }
    setPage(1);
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1], filterValues[2], filterValues[3], filterValues[4]]
        : type === "genre"
        ? [filterValues[0], changedFilter, filterValues[2], filterValues[3], filterValues[4]]
        : type === "year"
        ? [filterValues[0], filterValues[1], changedFilter, filterValues[3], filterValues[4]]
        : type === "minRating"
        ? [filterValues[0], filterValues[1], filterValues[2], changedFilter, filterValues[4]]
        : [filterValues[0], filterValues[1], filterValues[2], filterValues[3], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];
  const filteredMovies = filterFunction(movies);
  const displayedMovies = [...filteredMovies].sort((a, b) => {
    if (sortOption === "high-low") return (b.vote_average ?? 0) - (a.vote_average ?? 0);
    if (sortOption === "low-high") return (a.vote_average ?? 0) - (b.vote_average ?? 0);
    return 0;
  });

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie: DiscoverMovieOverviewProps) => {
          return <AddToFavouritesIcon {...movie} />
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        sortOption={sortOption}
        yearFilter={filterValues[2].value}
        minRatingFilter={filterValues[3].value}
        languageFilter={filterValues[4].value}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 4 }}>
        <Pagination
          count={data?.total_pages}
          page={page}
          onChange={(_event, value) => setPage(value)}
        />
      </Box>
    </>
  );
};
export default HomePage;
