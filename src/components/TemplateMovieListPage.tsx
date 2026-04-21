import Header from "./HeaderMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "./MovieList";
import {  MovieListPageTemplateProps} from "../types/movieAppTypes";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

const MovieListPageTemplate= ({ movies, title, selectFavourite }: MovieListPageTemplateProps)=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList
          selectFavourite={selectFavourite}
          movies={movies}
        ></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
