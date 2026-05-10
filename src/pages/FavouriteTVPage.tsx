import { useContext } from "react";
import PageTemplate from "../components/TemplateTVListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getTVSeriesById } from "../api/tmdb-api";
import Spinner from "../components/Spinner";
import RemoveTVFromFavouritesIcon from "../components/cardIcons/RemoveTVFromFavourites";
import { TVSeriesOverview } from "../types/movieAppTypes";

const FavouriteTVPage = () => {
  const { tvFavourites: tvIds } = useContext(MoviesContext);

  const favouriteTVQueries = useQueries(
    tvIds.map((tvId) => {
      return {
        queryKey: ["tvSeries", tvId],
        queryFn: () => getTVSeriesById(tvId),
      };
    })
  );

  const isLoading = favouriteTVQueries.find((q) => q.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteTVQueries.map((q) => q.data as TVSeriesOverview);

  return (
    <PageTemplate
      title="Favourite TV Series"
      tvSeries={allFavourites}
      action={(tv: TVSeriesOverview) => {
        return <RemoveTVFromFavouritesIcon {...tv} />;
      }}
    />
  );
};

export default FavouriteTVPage;
