import React, { useState, useEffect, ChangeEvent } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";
import { FilterOption } from "../types/movieAppTypes";
import { getGenres } from "../api/tmdb-api";

const styles = {
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

interface FilterMoviesCardProps {
  titleFilter: string;
  genreFilter: string;
  onUserInput: (type: FilterOption, value: string) => void; // Added back to interface
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({ titleFilter, genreFilter, onUserInput }) => {
  const [genres, setGenres] = useState([{ id: '0', name: "All" }]);

  // New useEffect using the API utility
  useEffect(() => {
    getGenres().then((allGenres) => {
      setGenres([genres[0], ...allGenres]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.SyntheticEvent, type: FilterOption, value: string) => {
    e.preventDefault();
    onUserInput(type, value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "title", e.target.value);
  };

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange(e, "genre", e.target.value as string);
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <FilterAltIcon fontSize="large" />
            Filter the movies.
          </Typography>
          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search field"
            type="search"
            variant="filled"
            value={titleFilter}
            onChange={handleTextChange}
          />
          <FormControl sx={styles.formControl}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={genreFilter}
              onChange={handleGenreChange}
            >
              {genres.map((genre) => {
                return (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the movies.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterMoviesCard;
