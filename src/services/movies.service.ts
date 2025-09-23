import api from './axios';

export const getMovies = async () => {
  return await api.get('/discover/movie');
};

export const getFilteredMovies = async (filter: string) => {
  return await api.get(`/movie/${filter}`);
};

export const getMovieGenres = async () => {
  return await api.get(`/genre/movie/list`);
};
