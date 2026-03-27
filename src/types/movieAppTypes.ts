// src/types/tmdb.ts

import { paths } from "./generated/tmdb";

// Type for the API response when discovering movies
export type DiscoverMoviesProps = paths["/3/discover/movie"]["get"]["responses"][200]["content"]["application/json"];

// Type for a single movie object from the discover movies response
export type DiscoverMovieOverviewProps = NonNullable<DiscoverMoviesProps["results"]>[number];

// Props interface for components that display a list of movies
export type BaseMovieListProps = {
  movies: NonNullable<DiscoverMoviesProps["results"]>;
}

// Type for the API response when fetching detailed movie information
export type MovieDetailsProps = paths["/3/movie/{movie_id}"]["get"]["responses"][200]["content"]["application/json"];

export type MovieImage = {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export type MoviePageProps = {
  movie: MovieDetailsProps;
  images: MovieImage[];
}
