// src/types/tmdb.ts

import { paths } from "./generated/tmdb";

// Type for the API response when discovering movies
export type DiscoverMoviesProps = paths["/3/discover/movie"]["get"]["responses"][200]["content"]["application/json"];

// Type for a single movie object from the discover movies response - Updated with favourite
// favourite is optional 'unblock' the Upcoming Movies page that stopped working after Lab 4
// when the cardIcons was added. This was causing the app to show a white page for 'Discover' page
export type DiscoverMovieOverviewProps = NonNullable<DiscoverMoviesProps["results"]>[number] & {
  favourite? : boolean;
};

// Props interface for components that display a list of movies
export type BaseMovieListProps  ={
  movies: NonNullable<DiscoverMovieOverviewProps[]>;
 action: (m: DiscoverMovieOverviewProps) => React.ReactNode;
}

// Type for the API response when fetching detailed movie information - Updated with favourite
// favourite is optional 'unblock' the Upcoming Movies page that stopped working after Lab 4
// when the cardIcons was added. It was added here as a precaution.
export type MovieDetailsProps = paths["/3/movie/{movie_id}"]["get"]["responses"][200]["content"]["application/json"] & {
  favourite? : boolean;
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

export interface Genre {
  id: number;
  name: string;
}

export interface genreData {
  genres: Genre[];
}

export interface Review {
  author: string;
  content: string;
  rating: number;
  movieId: number;
}

export type MovieReviewsProps = paths["/3/movie/{movie_id}/reviews"]["get"]["responses"][200]["content"]["application/json"];

export type MovieReviewProps = NonNullable<MovieReviewsProps["results"]>[number];
