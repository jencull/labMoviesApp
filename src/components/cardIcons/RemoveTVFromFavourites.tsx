import { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { TVSeriesOverview } from "../../types/movieAppTypes";

const RemoveTVFromFavouritesIcon = (tvSeries: TVSeriesOverview) => {
  const context = useContext(MoviesContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeFromTVFavourites(tvSeries);
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

export default RemoveTVFromFavouritesIcon;
