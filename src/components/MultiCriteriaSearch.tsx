import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { FilterOption } from "../types/movieAppTypes";

const styles = {
  root: {
    maxWidth: 345,
  },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

const currentYear = new Date().getFullYear();
const yearOptions = [
  { value: "0", label: "All" },
  ...Array.from({ length: 5 }, (_, i) => {
    const year = currentYear - i;
    return { value: String(year), label: String(year) };
  }),
];

const ratingOptions = [
  { value: "0", label: "Any" },
  { value: "5", label: "5+" },
  { value: "6", label: "6+" },
  { value: "7", label: "7+" },
  { value: "8", label: "8+" },
];

const languageOptions = [
  { value: "all", label: "Any" },
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "ko", label: "Korean" },
];

interface MultiCriteriaSearchProps {
  yearFilter: string;
  minRatingFilter: string;
  languageFilter: string;
  onUserInput: (type: FilterOption, value: string) => void;
}

const MultiCriteriaSearch = ({
  yearFilter,
  minRatingFilter,
  languageFilter,
  onUserInput,
}: MultiCriteriaSearchProps) => {
  const handleChange = (e: SelectChangeEvent, type: FilterOption, value: string) => {
    e.preventDefault()
    onUserInput(type, value)
  };

  const handleYearChange = (e: SelectChangeEvent) => {
    handleChange(e, "year", e.target.value)
  };

  const handleRatingChange = (e: SelectChangeEvent) => {
    handleChange(e, "minRating", e.target.value)
  };

  const handleLanguageChange = (e: SelectChangeEvent) => {
    handleChange(e, "language", e.target.value)
  };

  return (
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <FilterAltIcon fontSize="large" />
          Advanced Search
        </Typography>

        <FormControl sx={styles.formControl}>
          <InputLabel id="year-label">Release Year</InputLabel>
          <Select
            labelId="year-label"
            id="year-select"
            value={yearFilter}
            onChange={handleYearChange}
          >
            {yearOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={styles.formControl}>
          <InputLabel id="rating-label">Minimum Rating</InputLabel>
          <Select
            labelId="rating-label"
            id="rating-select"
            value={minRatingFilter}
            onChange={handleRatingChange}
          >
            {ratingOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={styles.formControl}>
          <InputLabel id="language-label">Original Language</InputLabel>
          <Select
            labelId="language-label"
            id="language-select"
            value={languageFilter}
            onChange={handleLanguageChange}
          >
            {languageOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default MultiCriteriaSearch;
