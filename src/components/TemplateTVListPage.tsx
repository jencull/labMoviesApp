import Header from "./HeaderMovieList";
import Grid from "@mui/material/Grid";
import TVList from "./TVList";
import { TVSeriesOverview } from "../types/movieAppTypes";

interface TemplateTVListPageProps {
  title: string;
  tvSeries: TVSeriesOverview[];
  action: (tv: TVSeriesOverview) => React.ReactNode;
}

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
};

const TemplateTVListPage = ({ tvSeries, title, action }: TemplateTVListPageProps) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <TVList action={action} tvSeries={tvSeries} />
      </Grid>
    </Grid>
  );
};

export default TemplateTVListPage;
