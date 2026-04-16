import { useState, useEffect } from "react";
import Header from "../components/HeaderMovieList";
import FilterCard from "../components/FilterMoviesCard";
import Grid from "@mui/material/Grid";
import MovieList from "../components/MovieList";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { FilterOption, DiscoverMovieOverviewProps } from "../types/movieAppType";

const styles = {
  root: {
    padding: "20px",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

const MovieListPage = () => {
  const [movies, setMovies] = useState<DiscoverMovieOverviewProps[]>([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const genreId = Number(genreFilter);

  const displayedMovies = movies
    .filter((m: DiscoverMovieOverviewProps) => {
      return (m.title ?? "").toLowerCase().search(titleFilter.toLowerCase()) !== -1;
    })
    .filter((m: DiscoverMovieOverviewProps) => {
      return genreId > 0 ? m.genre_ids?.includes(genreId) : true;
    });

  const handleChange = (type: FilterOption, value: string) => {
    if (type === "title") setTitleFilter(value);
    else setGenreFilter(value);
  };

  // The new function to handle adding to favourites
  const addToFavourites = (movieId: number) => {
    const updatedMovies = movies.map((m: DiscoverMovieOverviewProps) =>
      m.id === movieId ? { ...m, favourite: true } : m
    );
    setMovies(updatedMovies);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
      .then((res) => res.json())
      .then((json) => {
        return json.results;
      })
      .then((movies) => {
        setMovies(movies);
      });
  }, []);

  return (
    <>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title={"Home Page"} />
        </Grid>
        <Grid item container spacing={5}>
          {/* Updated to pass the selectFavourite function */}
          <MovieList movies={displayedMovies} selectFavourite={addToFavourites} />
        </Grid>
      </Grid>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={handleChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
        />
      </Drawer>
    </>
  );
};

export default MovieListPage;
