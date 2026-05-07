import { ChangeEvent } from "react";
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
import { FilterOption, genreData } from "../types/movieAppTypes";
import { getGenres } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from './Spinner';

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

interface FilterTVSeriesCardProps {
  titleFilter: string;
  genreFilter: string;
  sortOption: string;
  onUserInput: (type: FilterOption, value: string) => void;
}

const sortOptions = [
  { value: "none", label: "None" },
  { value: "high-low", label: "Rating (high to low)" },
  { value: "low-high", label: "Rating (low to high)" },
];

const FilterTVSeriesCard = ({ titleFilter, genreFilter, sortOption, onUserInput }: FilterTVSeriesCardProps) => {
  const { data, error, isLoading, isError } = useQuery<genreData, Error>("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  const genres = data?.genres || [];
  if (genres[0].name !== "All") {
    genres.unshift({ id: 0, name: "All" });
  }

  const handleChange = (e: SelectChangeEvent, type: FilterOption, value: string) => {
    e.preventDefault()
      onUserInput(type, value)
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "title", e.target.value)
  }

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange(e, "genre", e.target.value)
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    handleChange(e, "sort", e.target.value)
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <FilterAltIcon fontSize="large" />
            Filter the TV series.
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
            Sort the TV series.
          </Typography>
          <FormControl sx={styles.formControl}>
            <InputLabel id="sort-label">Sort by</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={sortOption}
              onChange={handleSortChange}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterTVSeriesCard;
