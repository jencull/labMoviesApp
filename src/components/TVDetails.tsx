import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import StarRate from "@mui/icons-material/StarRate";
import TvIcon from "@mui/icons-material/Tv";
import Typography from "@mui/material/Typography";
import { TVSeriesDetails } from "../types/movieAppTypes";

const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
    },
    chipLabel: {
        margin: 0.5,
    },
};

const TVDetails = (tvSeries: TVSeriesDetails) => {
    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {tvSeries.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {tvSeries.genres?.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip
                    icon={<TvIcon />}
                    label={`${tvSeries.number_of_seasons} season(s)`}
                />
                <Chip
                    icon={<StarRate />}
                    label={`${tvSeries.vote_average}`}
                />
                <Chip label={`First aired: ${tvSeries.first_air_date}`} />
            </Paper>
        </>
    );
};

export default TVDetails;
