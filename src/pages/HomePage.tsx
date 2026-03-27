import Header from "../components/HeaderMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../components/MovieList";
import { BaseMovieListProps } from "../types/movieAppTypes";
 
const styles = {
  root: {
    padding: "20px",
  },
};

const MovieListPage = ({ movies }: BaseMovieListProps) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={"Home Page"} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList movies={movies}></MovieList>
      </Grid>
    </Grid>
  );
};
export default MovieListPage;
