import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MoviesContext } from "../../contexts/moviesContext";
import { getGenres } from "../../api/tmdb-api";
import { FantasyMovie, genreData } from "../../types/movieAppTypes";

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

type FantasyMovieFormInputs = Omit<FantasyMovie, "id" | "productionCompanies"> & {
  productionCompany: string;
};

const FantasyMovieForm = () => {
  const defaultValues = {
    defaultValues: {
      title: "",
      overview: "",
      genres: [] as string[],
      releaseDate: "",
      runtime: 0,
      productionCompany: "",
    },
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FantasyMovieFormInputs>(defaultValues);

  // Fetching genres from TMDB API to use in a dropdown
  const { data: genreData } = useQuery<genreData>("genres", getGenres);
  const [genreNames, setGenreNames] = useState<string[]>([]);

  const context = useContext(MoviesContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (genreData?.genres) {
      setGenreNames(genreData.genres.map((g) => g.name));
    }
  }, [genreData]);

  const onSubmit: SubmitHandler<FantasyMovieFormInputs> = (data) => {
    const newFantasyMovie: FantasyMovie = {
      title: data.title,
      overview: data.overview,
      genres: data.genres,
      releaseDate: data.releaseDate,
      runtime: data.runtime,
      id: Date.now().toString(),
      productionCompanies: [data.productionCompany],
    };
    context.addFantasyMovie(newFantasyMovie);
    navigate("/fantasy-movie");
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Create a Fantasy Movie
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
          name="overview"
          control={control}
          rules={{ required: "Overview is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={value}
              onChange={onChange}
              label="Overview"
              id="overview"
              multiline
              minRows={4}
            />
          )}
        />
        {errors.overview && (
          <Typography variant="h6" component="p">
            {errors.overview.message}
          </Typography>
        )}

        <Controller
          name="genres"
          control={control}
          rules={{ required: "At least one genre is required" }}
          render={({ field: { onChange, value } }) => (
            <FormControl variant="outlined" margin="normal" fullWidth required>
              <InputLabel id="genres-label">Genres</InputLabel>
              <Select
                labelId="genres-label"
                multiple
                value={value}
                onChange={onChange}
                input={<OutlinedInput label="Genres" />}
                renderValue={(selected) => (selected as string[]).join(", ")}
              >
                {genreNames.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        {errors.genres && (
          <Typography variant="h6" component="p">
            {errors.genres.message}
          </Typography>
        )}

        <Controller
          name="releaseDate"
          control={control}
          rules={{ required: "Release date is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={value}
              onChange={onChange}
              label="Release Date"
              id="releaseDate"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        {errors.releaseDate && (
          <Typography variant="h6" component="p">
            {errors.releaseDate.message}
          </Typography>
        )}

        <Controller
          name="runtime"
          control={control}
          rules={{
            required: "Runtime is required",
            min: { value: 1, message: "Runtime must be greater than 0" },
          }}
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={styles.textField}
              variant="outlined"
              margin="normal"
              required
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              label="Runtime (minutes)"
              id="runtime"
              type="number"
            />
          )}
        />
        {errors.runtime && (
          <Typography variant="h6" component="p">
            {errors.runtime.message}
          </Typography>
        )}

        <Controller
          name="productionCompany"
          control={control}
          rules={{ required: "Production company is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={styles.textField}
              variant="outlined"
              margin="normal"
              required
              onChange={onChange}
              value={value}
              id="productionCompany"
              label="Production Company"
            />
          )}
        />
        {errors.productionCompany && (
          <Typography variant="h6" component="p">
            {errors.productionCompany.message}
          </Typography>
        )}

        <Box>
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
              reset({
                title: "",
                overview: "",
                genres: [],
                releaseDate: "",
                runtime: 0,
                productionCompany: "",
              });
            }}
          >
            Reset
          </Button>
        </Box>

      </form>
    </Box>
  );
};

export default FantasyMovieForm;
