import { useParams } from "react-router-dom";
import TVDetails from "../components/TVDetails";
import PageTemplate from "../components/TemplateTVPage";
import { getTVSeriesDetails } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/Spinner";
import { TVSeriesDetails } from "../types/movieAppTypes";

const TVDetailsPage = () => {
  const { id } = useParams();
  const { data: tvSeries, error, isLoading, isError } = useQuery<TVSeriesDetails, Error>(
    ["tvSeries", id],
    () => getTVSeriesDetails(id || "")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {tvSeries ? (
        <>
          <PageTemplate tvSeries={tvSeries}>
            <TVDetails {...tvSeries} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for TV series details</p>
      )}
    </>
  );
};

export default TVDetailsPage;
