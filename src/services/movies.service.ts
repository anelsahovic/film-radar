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

export const getFilteredMovies = async (filter: string, page: number) => {
  const params = new URLSearchParams();

  if (page) {
    params.append('page', page.toString());
  }
  return await api.get(`/movie/${filter}?${params}`);
};

export const getMovieByQuery = async (query: string, page: number) => {
  const params = new URLSearchParams({
    query: query,
    page: page.toString(),
  });

  return await api.get(`/search/movie?${params.toString()}`);
};

export const getMovieById = async (id: string) => {
  return await api.get(`/movie/${id}`);
};

export const getMovieGenres = async () => {
  return await api.get(`/genre/movie/list`);
};
