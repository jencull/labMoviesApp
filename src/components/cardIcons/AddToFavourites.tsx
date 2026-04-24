import  {MouseEvent, useContext} from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MovieDetailsProps, DiscoverMovieOverviewProps } from "../../types/movieAppTypes";

// added (movie: MovieDetailsProps | DiscoverMovieOverviewProps) so Upcoming page will work correctly
// after added the cardIcons
const AddToFavouritesIcon = (movie: MovieDetailsProps | DiscoverMovieOverviewProps) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(movie);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;
