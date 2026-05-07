import { useState } from "react";
import FilterCard from "./FilterTVSeriesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { TVSeriesOverview } from "../types/movieAppTypes";

export const nameFilter = (tvSeries: TVSeriesOverview, value: string): boolean => {
    return tvSeries.name?.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (tvSeries: TVSeriesOverview, value: string): boolean => {
    const genreId = Number(value);
    if (genreId <= 0) return true;
    return (tvSeries.genre_ids ?? []).includes(genreId);
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

type TVSeriesFilterUIProps = {
    onFilterValuesChange: (f: string, s: string) => void;
    nameFilter: string;
    genreFilter: string;
    sortOption?: string;
}

const TVSeriesFilterUI = ({ onFilterValuesChange, nameFilter, genreFilter, sortOption = "none" }: TVSeriesFilterUIProps) => {
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
                    titleFilter={nameFilter}
                    genreFilter={genreFilter}
                    sortOption={sortOption}
                />
            </Drawer>
        </>
    );
};

export default TVSeriesFilterUI;
