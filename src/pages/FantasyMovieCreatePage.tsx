import Container from "@mui/material/Container";
import FantasyMovieForm from "../components/fantasyMovieForm";

const FantasyMovieCreatePage = () => {
  return (
    <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <FantasyMovieForm />
    </Container>
  );
}; // this page has movie context to display, unlike review form so using a plain container instead of a template

export default FantasyMovieCreatePage;
