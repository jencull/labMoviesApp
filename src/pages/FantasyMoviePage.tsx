import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MoviesContext } from "../contexts/moviesContext";
import { FantasyMovie } from "../types/movieAppTypes";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const styles = {
  container: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  card: {
    marginBottom: 2,
  },
  chipSet: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
};

const FantasyMoviePage = () => {
  const { fantasyMovies } = useContext(MoviesContext);
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={styles.container}>
      <Typography component="h1" variant="h4" gutterBottom>
        My Fantasy Movies
      </Typography>
      {fantasyMovies.length === 0 ? (
        <Typography variant="h6" component="p">
          No fantasy movies yet. Create one!
        </Typography>
      ) : (
        fantasyMovies.map((movie: FantasyMovie) => (
          <Card key={movie.id} sx={styles.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {movie.title}
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {movie.overview}
              </Typography>
              <Paper component="ul" sx={styles.chipSet}>
                <li>
                  <Chip label="Genres" color="primary" sx={styles.chipLabel} />
                </li>
                {movie.genres.map((genre) => (
                  <li key={genre}>
                    <Chip label={genre} sx={styles.chipLabel} />
                  </li>
                ))}
              </Paper>
              <Typography variant="body2" component="p">
                Released: {movie.releaseDate}
              </Typography>
              <Typography variant="body2" component="p">
                Runtime: {movie.runtime} min.
              </Typography>
              <Typography variant="body2" component="p">
                Production Company: {movie.productionCompanies[0]}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/fantasy-movie/create")}
        sx={{ marginTop: 2 }}
      >
        Create Fantasy Movie
      </Button>
    </Container>
  );
};

export default FantasyMoviePage;
