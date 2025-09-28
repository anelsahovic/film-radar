import type { BaseMedia } from './shared.types';

export interface Movie extends BaseMedia {
  media_type: 'movie';
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

export interface MovieDetails extends Movie {
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  imdb_id: string | null;
  origin_country: string[];
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    iso_639_1: string;
    name: string;
    english_name: string;
  }[];
  status: string;
  tagline: string | null;
}
