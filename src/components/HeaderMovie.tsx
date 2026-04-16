import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite"; // 1. Added Import
import { MovieDetailsProps } from "../types/movieAppTypes"; 

const styles = {
    root: {  
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
};

const MovieHeader = (movie: MovieDetailsProps) => {
  const favourites = JSON.parse(localStorage.getItem("favourites") || '[]');
  const isFavourite = favourites.some((m: any) => m.id === movie.id);

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      {/* Logic moved here: between the back button and the title group */}
      {isFavourite && (
        <FavoriteIcon color="error" fontSize="large" />
      )}

      <Typography variant="h4" component="h3">
        {movie.title}{"   "}
        <a href={movie.homepage}>
          <HomeIcon color="primary" fontSize="large"/>
        </a>
        <br />
        <Typography variant="subtitle1" component="span">
          {movie.tagline}
        </Typography>
      </Typography>

      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
