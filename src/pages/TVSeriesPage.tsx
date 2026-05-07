import PageTemplate from "../components/TemplateTVListPage";
import { TVSeriesOverview } from "../types/movieAppTypes";
import { getTVSeries } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI from "../components/MovieFilterUI";
import { useQuery } from "react-query";
import Spinner from "../components/Spinner";

const nameFilter = (tvSeries: TVSeriesOverview, value: string): boolean => {
  return tvSeries.name.toLowerCase().search(value.toLowerCase()) !== -1;
};

const nameFiltering = {
  name: "title",
  value: "",
  condition: nameFilter,
};

const TVSeriesPage = () => {
  const { data, error, isLoading, isError } = useQuery<TVSeriesOverview[], Error>(
    "tvSeries",
    getTVSeries
  );
  const { filterValues, setFilterValues, filterFunction } = useFiltering([nameFiltering]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    setFilterValues([changedFilter]);
  };

  const tvSeries = data ? data : [];
  const displayedSeries = filterFunction(tvSeries);

  return (
    <>
      <PageTemplate
        title="Discover TV Series"
        tvSeries={displayedSeries}
        action={(_tv: TVSeriesOverview) => {
          return <></>;
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter=""
      />
    </>
  );
};

export default TVSeriesPage;
