import React, { useState, useCallback } from "react";
import {  MovieDetailsProps } from "../types/movieAppTypes";


type MovieContextInterface = {
    favourites: number[];
    addToFavourites: ((movie: MovieDetailsProps) => void);
    removeFromFavourites: ((movie: MovieDetailsProps) => void);
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {}
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [favourites, setFavourites] = useState<number[]>([]);

    const addToFavourites = useCallback((movie: MovieDetailsProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);

    const removeFromFavourites = useCallback((movie: MovieDetailsProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
