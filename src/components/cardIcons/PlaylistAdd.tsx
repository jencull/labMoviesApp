import  {MouseEvent, useContext} from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MovieDetailsProps, DiscoverMovieOverviewProps } from "../../types/movieAppTypes";

const AddToPlaylistIcon = (movie: MovieDetailsProps | DiscoverMovieOverviewProps) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(movie);
  };
  return (
    <IconButton aria-label="add to playlist" onClick={onUserSelect}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToPlaylistIcon;