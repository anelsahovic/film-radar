import api from './axios';

export const getMovies = async (sort: string, genre: string) => {
  const params = new URLSearchParams();

  if (sort !== 'default') {
    params.append('sort_by', sort);
  }
  if (genre !== 'default') {
    params.append('with_genres', genre);
  }
  return await api.get(`/discover/movie?${params.toString()}`);
};

export const getFilteredMovies = async (filter: string) => {
  return await api.get(`/movie/${filter}`);
};

export const getMovieGenres = async () => {
  return await api.get(`/genre/movie/list`);
};
