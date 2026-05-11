import React, { useState } from "react";
import FilterCard from "./FilterMoviesCard";
import MultiCriteriaSearch from "./MultiCriteriaSearch";
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

export const yearFilter = (movie: MovieDetailsProps, value: string): boolean => {
    if (value === "0") return true;
    return movie.release_date?.startsWith(value) ?? false;
};

export const minRatingFilter = (movie: MovieDetailsProps, value: string): boolean => {
    const threshold = Number(value);
    if (threshold === 0) return true;
    return (movie.vote_average ?? 0) >= threshold;
};

export const languageFilter = (movie: MovieDetailsProps, value: string): boolean => {
    if (value === "all") return true;
    return movie.original_language === value;
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

type MovieFilterUIProps = {
    onFilterValuesChange: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
    sortOption?: string;
    yearFilter: string;
    minRatingFilter: string;
    languageFilter: string;
}

const MovieFilterUI = ({
    onFilterValuesChange,
    titleFilter,
    genreFilter,
    sortOption = "none",
    yearFilter,
    minRatingFilter,
    languageFilter,
}: MovieFilterUIProps) => {

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
                    sortOption={sortOption}
                />
                <MultiCriteriaSearch
                    onUserInput={onFilterValuesChange}
                    yearFilter={yearFilter}
                    minRatingFilter={minRatingFilter}
                    languageFilter={languageFilter}
                />
            </Drawer>
        </>
    );
};

export default MovieFilterUI;
