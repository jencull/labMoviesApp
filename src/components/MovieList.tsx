import Movie from "./MovieCard";
import Grid from "@mui/material/Grid";
import { BaseMovieListProps } from "../types/movieAppTypes";

const MovieList  = ({ movies, action }: BaseMovieListProps) => {
    const movieCards = movies.map((m) => (
        <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Movie key={m.id} movie={m} action={action}/>
        </Grid>
    ));
    return movieCards;
}

export default MovieList;
