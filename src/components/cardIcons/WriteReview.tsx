import RateReviewIcon from "@mui/icons-material/RateReview";
import {MovieDetailsProps} from "../../types/movieAppTypes"
import { Link } from "react-router-dom";

const WriteReviewIcon= (movie: MovieDetailsProps) => {
 return (
    <Link
    to={'/reviews/form'}
    state={{
        movieId: movie.id,
      }}
  >
    <RateReviewIcon color="primary" fontSize="large" />
  </Link>
  );
};

export default  WriteReviewIcon;
