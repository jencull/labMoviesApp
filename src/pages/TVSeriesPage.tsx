import PageTemplate from "../components/TemplateTVListPage";
import { TVSeriesOverview } from "../types/movieAppTypes";
import { getTVSeries } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TVSeriesFilterUI, {
  nameFilter,
  genreFilter,
} from "../components/TVSeriesFilterUI";
import { useQuery } from "react-query";
import Spinner from "../components/Spinner";
import { useState } from "react";

const nameFiltering = {
  name: "title",
  value: "",
  condition: nameFilter,
};

const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const TVSeriesPage = () => {
  const { data, error, isLoading, isError } = useQuery<TVSeriesOverview[], Error>(
    "tvSeries",
    getTVSeries
  );
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [nameFiltering, genreFiltering]
  );
  const [sortOption, setSortOption] = useState("none");

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    if (type === "sort") {
      setSortOption(value);
      return;
    }
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const tvSeries = data ? data : [];
  const filteredSeries = filterFunction(tvSeries);
  const displayedSeries = [...filteredSeries].sort((a: TVSeriesOverview, b: TVSeriesOverview) => {
    if (sortOption === "high-low") return (b.vote_average ?? 0) - (a.vote_average ?? 0);
    if (sortOption === "low-high") return (a.vote_average ?? 0) - (b.vote_average ?? 0);
    return 0;
  });

  return (
    <>
      <PageTemplate
        title="Discover TV Series"
        tvSeries={displayedSeries}
        action={(_tv: TVSeriesOverview) => {
          return <></>;
        }}
      />
      <TVSeriesFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        sortOption={sortOption}
      />
    </>
  );
};

export default TVSeriesPage;
