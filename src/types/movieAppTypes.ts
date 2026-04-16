// src/types/tmdb.ts

import { paths } from "./generated/tmdb";

// Type for the API response when discovering movies
export type DiscoverMoviesProps = paths["/3/discover/movie"]["get"]["responses"][200]["content"]["application/json"];

// Type for a single movie object from the discover movies response - Updated with favourite
export type DiscoverMovieOverviewProps = NonNullable<DiscoverMoviesProps["results"]>[number] & {
  favourite: boolean;
};

// Props interface for components that display a list of movies - Updated
export type BaseMovieListProps = {
  movies: DiscoverMovieOverviewProps[];
  selectFavourite: (movieId: number) => void;
}

// Type for the API response when fetching detailed movie information - Updated with favourite
export type MovieDetailsProps = paths["/3/movie/{movie_id}"]["get"]["responses"][200]["content"]["application/json"] & {
  favourite: boolean;
};

export type MovieImage = {
  file_path: string;
  aspect_ratio?: number; 
  height?: number;
  iso_639_1?: string; 
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export type ProductionCountry = {
  iso_3166_1: string; 
  name: string;
};

export type MoviePageProps = {
  movie: MovieDetailsProps;
  images: MovieImage[];
}

export type FilterOption = "title" | "genre";

export interface MovieListPageTemplateProps extends BaseMovieListProps {
  title: string;
}
