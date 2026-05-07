import TVCard from "./TVCard";
import Grid from "@mui/material/Grid";
import { TVSeriesOverview } from "../types/movieAppTypes";

interface TVListProps {
  tvSeries: TVSeriesOverview[];
  action: (tv: TVSeriesOverview) => React.ReactNode;
}

const TVList = ({ tvSeries, action }: TVListProps) => {
  const tvCards = tvSeries.map((tv) => (
    <Grid key={tv.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <TVCard key={tv.id} tvSeries={tv} action={action} />
    </Grid>
  ));
  return tvCards;
};

export default TVList;
