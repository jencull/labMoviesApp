import { MovieReviewProps } from "../types/movieAppTypes";

const MovieReview = (props: MovieReviewProps) => {
  return (
    <>
      <p>Review By: {props.author} </p>
      <p>{props.content} </p>
    </>
  );
};
export default MovieReview
