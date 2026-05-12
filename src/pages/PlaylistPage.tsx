import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MoviesContext } from "../contexts/moviesContext";
import { Playlist } from "../types/movieAppTypes";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const styles = {
  container: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  card: {
    marginBottom: 2,
  },
};

const PlaylistPage = () => {
  const { playlists } = useContext(MoviesContext);
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={styles.container}>
      <Typography component="h1" variant="h4" gutterBottom>
        My Playlists
      </Typography>
      {playlists.length === 0 ? (
        <Typography variant="h6" component="p">
          No playlists yet. Create one!
        </Typography>
      ) : (
        playlists.map((playlist: Playlist) => (
          <Card key={playlist.id} sx={styles.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {playlist.title}
              </Typography>
              <Typography variant="body1" component="p">
                Theme: {playlist.theme}
              </Typography>
              <Typography variant="body2" component="p">
                {playlist.movieIds.length} movie{playlist.movieIds.length !== 1 ? "s" : ""}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="outlined"
                onClick={() => navigate(`/playlists/${playlist.id}`)}
              >
                View
              </Button>
            </CardActions>
          </Card>
        ))
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/playlists/create")}
        sx={{ marginTop: 2 }}
      >
        Create Playlist
      </Button>
    </Container>
  );
};

export default PlaylistPage;
