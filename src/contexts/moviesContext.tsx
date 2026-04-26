import React, { useState, useCallback } from "react";
import {  MovieDetailsProps, DiscoverMovieOverviewProps,  Review } from "../types/movieAppTypes";

// (movie: MovieDetailsProps | DiscoverMovieOverviewProps) added to types and callbacks fix white screen on discover page
// after lab 4

type MovieContextInterface = {
    favourites: number[];
    addToFavourites: (movie: MovieDetailsProps | DiscoverMovieOverviewProps) => void;
    removeFromFavourites: (movie: MovieDetailsProps | DiscoverMovieOverviewProps) => void;
    addReview: (movie: MovieDetailsProps, review: Review) => void;
    mustWatch: number[];
    addToMustWatch: (movie: MovieDetailsProps | DiscoverMovieOverviewProps) => void;
    removeFromMustWatch: (movie: MovieDetailsProps | DiscoverMovieOverviewProps) => void;
}

const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: (movie, review) => { movie.id, review },
    mustWatch: [],
    addToMustWatch: () => {},
    removeFromMustWatch: () => {},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [myReviews, setMyReviews] = useState<any>( {} ); // Lab uses {} logic
    const [mustWatch, setMustWatch] = useState<number[]>([]);

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

    const addReview = (movie: MovieDetailsProps, review: Review) => {
        setMyReviews( { ...myReviews, [movie.id]: review } );
    };

    const addToMustWatch = useCallback((movie: MovieDetailsProps | DiscoverMovieOverviewProps) => {
        setMustWatch((prevMustWatch) => {
            if (!prevMustWatch.includes(movie.id)) {
                console.log("Must Watch List:", [...prevMustWatch, movie.id]);
                return [...prevMustWatch, movie.id];
            }
            return prevMustWatch;
        });
    }, []);

    const removeFromMustWatch = useCallback((movie: MovieDetailsProps | DiscoverMovieOverviewProps) => {
        setMustWatch((prevMustWatch) => prevMustWatch.filter((mId) => mId !== movie.id));
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,
                mustWatch,
                addToMustWatch,
                removeFromMustWatch,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
