import React from "react";
import TVHeader from "./HeaderTV";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getTVSeriesImages } from "../api/tmdb-api";
import { MovieImage, TVSeriesDetails } from "../types/movieAppTypes";
import { useQuery } from "react-query";
import Spinner from "./Spinner";

const styles = {
    gridListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    gridListTile: {
        width: 450,
        height: '100vh',
    },
};

interface TemplateTVPageProps {
    tvSeries: TVSeriesDetails;
    children: React.ReactElement;
}

const TemplateTVPage = ({ tvSeries, children }: TemplateTVPageProps) => {
    const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
        ["tvImages", tvSeries.id],
        () => getTVSeriesImages(tvSeries.id)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{(error).message}</h1>;
    }

    const images = data as MovieImage[];

    return (
        <>
            <TVHeader {...tvSeries} />

            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid item xs={3}>
                    <div>
                        <ImageList cols={1}>
                            {images.map((image: MovieImage) => (
                                <ImageListItem
                                    key={image.file_path}
                                    sx={styles.gridListTile}
                                    cols={1}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                        alt={'Image alternative'}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </Grid>

                <Grid item xs={9}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateTVPage;
