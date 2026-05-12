import React, { useState, useCallback, useEffect } from "react";
import {  MovieDetailsProps, DiscoverMovieOverviewProps,  Review, FantasyMovie, TVSeriesOverview } from "../types/movieAppTypes";

// (movie: MovieDetailsProps | DiscoverMovieOverviewProps) added to types and callbacks fix white screen on discover page
// after lab 4

type MovieContextInterface = {
    favourites: number[];
    addToFavourites: (movie: MovieDetailsProps | DiscoverMovieOverviewProps) => void;
    removeFromFavourites: (movie: MovieDetailsProps | DiscoverMovieOverviewProps) => void;
    reorderFavourites: (fromIndex: number, toIndex: number) => void;
    myReviews: { [movieId: number]: Review };
    addReview: (movie: MovieDetailsProps, review: Review) => void;
    mustWatch: number[];
    addToMustWatch: (movie: MovieDetailsProps | DiscoverMovieOverviewProps) => void;
    removeFromMustWatch: (movie: MovieDetailsProps | DiscoverMovieOverviewProps) => void;
    fantasyMovies: FantasyMovie[];
    addFantasyMovie: (movie: FantasyMovie) => void;
    tvFavourites: number[];
    addToTVFavourites: (tvSeries: TVSeriesOverview) => void;
    removeFromTVFavourites: (tvSeries: TVSeriesOverview) => void;
}

const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    reorderFavourites: () => {},
    myReviews: {},
    addReview: (movie, review) => { movie.id, review },
    mustWatch: [],
    addToMustWatch: () => {},
    removeFromMustWatch: () => {},
    fantasyMovies: [],
    addFantasyMovie: () => {},
    tvFavourites: [],
    addToTVFavourites: () => {},
    removeFromTVFavourites: () => {},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [favourites, setFavourites] = useState<number[]>(
        JSON.parse(localStorage.getItem("favourites") ?? "[]")
    );  // https://felixgerschau.com/react-localstorage/
    const [myReviews, setMyReviews] = useState<any>( {} ); // Lab uses {} logic
    const [mustWatch, setMustWatch] = useState<number[]>([]);
    const [tvFavourites, setTVFavourites] = useState<number[]>([]);

    const addToTVFavourites = useCallback((tvSeries: TVSeriesOverview) => {
        setTVFavourites((prevTVFavourites) => {
            if (!prevTVFavourites.includes(tvSeries.id)) {
                return [...prevTVFavourites, tvSeries.id];
            }
            return prevTVFavourites;
        });
    }, []);

    const removeFromTVFavourites = useCallback((tvSeries: TVSeriesOverview) => {
        setTVFavourites((prevTVFavourites) => prevTVFavourites.filter((id) => id !== tvSeries.id));
    }, []);

    const [fantasyMovies, setFantasyMovies] = useState<FantasyMovie[]>(
        JSON.parse(localStorage.getItem("fantasyMovies") ?? "[]")
    );  // https://felixgerschau.com/react-localstorage/ 

    const addToFavourites = useCallback((movie: MovieDetailsProps | DiscoverMovieOverviewProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);

    const removeFromFavourites = useCallback((movie: MovieDetailsProps | DiscoverMovieOverviewProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);

    const reorderFavourites = useCallback((fromIndex: number, toIndex: number) => {
        setFavourites((prevFavourites) => {
            const updated = [...prevFavourites];
            const [moved] = updated.splice(fromIndex, 1);
            updated.splice(toIndex, 0, moved);
            return updated;
        });
    }, []);

    const addReview = (movie: MovieDetailsProps, review: Review) => {
        setMyReviews( { ...myReviews, [movie.id]: review } );
    };

    const addToMustWatch = useCallback((movie: MovieDetailsProps | DiscoverMovieOverviewProps) => {
        setMustWatch((prevMustWatch) => {
            if (!prevMustWatch.includes(movie.id)) {
                return [...prevMustWatch, movie.id];
            }
            return prevMustWatch;
        });
    }, []);

    const removeFromMustWatch = useCallback((movie: MovieDetailsProps | DiscoverMovieOverviewProps) => {
        setMustWatch((prevMustWatch) => prevMustWatch.filter((mId) => mId !== movie.id));
    }, []);

    // https://felixgerschau.com/react-localstorage/ 
    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }, [favourites]);

    useEffect(() => {
        localStorage.setItem("fantasyMovies", JSON.stringify(fantasyMovies));
    }, [fantasyMovies]);

    const addFantasyMovie = useCallback((movie: FantasyMovie) => {
        setFantasyMovies((prev) => [...prev, movie]);
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                reorderFavourites,
                myReviews,
                addReview,
                mustWatch,
                addToMustWatch,
                removeFromMustWatch,
                fantasyMovies,
                addFantasyMovie,
                tvFavourites,
                addToTVFavourites,
                removeFromTVFavourites,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
