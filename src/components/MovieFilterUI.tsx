import React, { useState } from "react";
import FilterCard from "./FilterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { MovieDetailsProps } from "../types/movieAppTypes";

export const titleFilter = (movie: MovieDetailsProps, value: string): boolean => {
    return movie.title?.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (movie: MovieDetailsProps, value: string) => {
    const genreId = Number(value);
    if (genreId <= 0) return true;
    if (Array.isArray((movie as { genre_ids?: number[] }).genre_ids)) {
        return (movie as { genre_ids?: number[] }).genre_ids?.includes(genreId) ?? false;
    }
    const genreIds = movie.genres?.map((g) => g.id);
    return genreIds ? genreIds.includes(genreId) : false;
};

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    },
    fab: {
        marginTop: 8,
        position: "fixed",
        top: 20,
        right: 2,
    },
};

type  MovieFilterUIProps = {
    onFilterValuesChange: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
}

const MovieFilterUI = ({ onFilterValuesChange, titleFilter, genreFilter }: MovieFilterUIProps) => {

    const [drawerOpen, setDrawerOpen] = useState(false);
    return (
        <>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                Filter
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <FilterCard
                    onUserInput={onFilterValuesChange}
                    titleFilter={titleFilter}
                    genreFilter={genreFilter}
                />
            </Drawer>
        </>
    );
};

export default MovieFilterUI;
