export interface KnownForMedia {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title?: string; // movies
  name?: string; // tv shows
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  media_type: 'movie' | 'tv';
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string; // movies
  first_air_date?: string; // tv shows
  video?: boolean; // movies
  vote_average: number;
  vote_count: number;
  origin_country?: string[]; // tv shows
}

export interface Person {
  adult: boolean;
  gender: number; // 0 = not set, 1 = female, 2 = male, 3 = non-binary
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  known_for: KnownForMedia[];
}

export interface PersonDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number; // 0 = not set, 1 = female, 2 = male, 3 = non-binary
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
}
