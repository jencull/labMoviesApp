import { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { MovieDetailsProps, DiscoverMovieOverviewProps } from "../../types/movieAppTypes";

// added (movie: MovieDetailsProps | DiscoverMovieOverviewProps) so Upcoming page will work correctly
// after added the cardIcons
const RemoveFromFavouritesIcon = (movie: MovieDetailsProps | DiscoverMovieOverviewProps) => {
  const context = useContext(MoviesContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeFromFavourites(movie);
  };

return (
  <IconButton
    aria-label="remove from favorites"
    onClick={onUserRequest}
  >
    <DeleteIcon color="primary" fontSize="large" />
  </IconButton>
);
};

export default RemoveFromFavouritesIcon;
