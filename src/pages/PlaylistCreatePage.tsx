import { useState, useContext } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { MoviesContext } from "../contexts/moviesContext";
import { getMovies } from "../api/tmdb-api";
import { Playlist, PaginatedMovieResults } from "../types/movieAppTypes";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

const styles = {
  root: {
    marginTop: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  form: {
    width: "100%",
    "& > * ": {
      marginTop: 2,
    },
  },
  textField: {
    width: "40ch",
  },
  submit: {
    marginRight: 2,
  },
};

type PlaylistFormInputs = {
  title: string;
  theme: string;
};

const PlaylistCreatePage = () => {
  const defaultValues = {
    defaultValues: {
      title: "",
      theme: "",
    },
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlaylistFormInputs>(defaultValues);

  // Search uses text input and a search button - user types a title and the movie appears.
  // Results only update when button is clicked.
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedMovieIds, setSelectedMovieIds] = useState<number[]>([]);

  const context = useContext(MoviesContext);
  const navigate = useNavigate();

  const { data: movieData } = useQuery<PaginatedMovieResults>(
    ["discover", 1],
    () => getMovies(1)
  );

  const searchResults = movieData?.results.filter((m) =>
    m.title?.toLowerCase().includes(activeSearch.toLowerCase())
  ) ?? [];

  const handleMovieSelect = (movieId: number) => {
    setSelectedMovieIds((prev) =>
      prev.includes(movieId) ? prev : [...prev, movieId]
    );
  };

  const handleMovieRemove = (movieId: number) => {
    setSelectedMovieIds((prev) => prev.filter((id) => id !== movieId));
  };

  const getMovieTitle = (movieId: number) =>
    movieData?.results.find((m) => m.id === movieId)?.title ?? `Movie ${movieId}`;

  const onSubmit: SubmitHandler<PlaylistFormInputs> = (data) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      title: data.title,
      theme: data.theme,
      movieIds: selectedMovieIds,
    };
    context.addPlaylist(newPlaylist);
    navigate("/playlists");
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Box component="div" sx={styles.root}>
        <Typography component="h2" variant="h3">
          Create a Playlist
        </Typography>

        <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>

          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textField}
                variant="outlined"
                margin="normal"
                required
                onChange={onChange}
                value={value}
                id="title"
                label="Title"
                autoFocus
              />
            )}
          />
          {errors.title && (
            <Typography variant="h6" component="p">
              {errors.title.message}
            </Typography>
          )}

          <Controller
            name="theme"
            control={control}
            rules={{ required: "Theme is required" }}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={styles.textField}
                variant="outlined"
                margin="normal"
                required
                onChange={onChange}
                value={value}
                id="theme"
                label="Theme"
              />
            )}
          />
          {errors.theme && (
            <Typography variant="h6" component="p">
              {errors.theme.message}
            </Typography>
          )}

          <Typography variant="h6" component="p" sx={{ marginTop: 2 }}>
            Add Movies
          </Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              label="Search movies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => setActiveSearch(searchTerm)}
              sx={{ marginTop: 1 }}
            >
              Search
            </Button>
          </Box>
          {activeSearch && (
            <Paper sx={{ maxHeight: 200, overflow: "auto" }}>
              <List dense>
                {searchResults.slice(0, 10).map((movie) => (
                  <ListItem key={movie.id} disablePadding>
                    <ListItemButton onClick={() => handleMovieSelect(movie.id!)}>
                      <ListItemText primary={movie.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {/* movie has a remove option https://mui.com/material-ui/react-chip/#deletable-chips */}
          {selectedMovieIds.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginTop: 1 }}>
              {selectedMovieIds.map((id) => (
                <Chip
                  key={id}
                  label={getMovieTitle(id)}
                  onDelete={() => handleMovieRemove(id)}
                />
              ))}
            </Box>
          )}

          <Box sx={{ marginTop: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={styles.submit}
            >
              Submit
            </Button>
            <Button
              type="reset"
              variant="contained"
              color="secondary"
              sx={styles.submit}
              onClick={() => {
                // reset clears the form
                reset({ title: "", theme: "" });
                setSelectedMovieIds([]);
                setSearchTerm("");
                setActiveSearch("");
              }}
            >
              Reset
            </Button>
          </Box>

        </form>
      </Box>
    </Container>
  );
};

export default PlaylistCreatePage;
