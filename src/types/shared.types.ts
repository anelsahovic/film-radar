import type { Movie } from './movies.types';
import type { TvShow } from './tv.types';

export interface BaseMedia {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  overview: string;
  poster_path: string | null;
  media_type: 'movie' | 'tv';
  original_language: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Review {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  url: string;
}

export type AllTrendingMedia = Movie | TvShow;
