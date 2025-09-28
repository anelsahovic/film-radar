import api from './axios';

export const getMovies = async (sort: string, genre: string, page: number) => {
  const params = new URLSearchParams({
    page: page.toString(),
  });

  if (sort !== 'default') {
    params.append('sort_by', sort);
  }
  if (genre !== 'default') {
    params.append('with_genres', genre);
  }

  return await api.get(`/discover/movie?${params.toString()}`);
};

export const getMoviesByFilter = async (filter: string, page: number) => {
  const params = new URLSearchParams();

  if (page) {
    params.append('page', page.toString());
  }
  return await api.get(`/movie/${filter}?${params}`);
};

export const getMovieByQuery = async (query: string, page: number) => {
  const params = new URLSearchParams({
    query,
    page: page.toString(),
  });

  return await api.get(`/search/movie?${params.toString()}`);
};

export const getMovieById = async (id: string) => {
  return await api.get(`/movie/${id}`);
};

export const getSimilarMovies = async (movieId: string) => {
  return await api.get(`/movie/${movieId}/similar`);
};

export const getMovieRecommendations = async (movieId: string) => {
  return await api.get(`/movie/${movieId}/recommendations`);
};

export const getMovieReviews = async (movieId: string) => {
  return await api.get(`/movie/${movieId}/reviews`);
};

export const getMovieVideos = async (movieId: string) => {
  return await api.get(`/movie/${movieId}/videos`);
};

export const getMovieGenres = async () => {
  return await api.get(`/genre/movie/list`);
};

export const getAllTrendingMedia = async (timeWindow: 'day' | 'week') => {
  return await api.get(`/trending/all/${timeWindow}`);
};
