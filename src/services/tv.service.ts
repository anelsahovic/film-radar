import api from './axios';

export const getTvShows = async (page: number) => {
  const params = new URLSearchParams({ page: page.toString() });

  return await api.get(`/discover/tv?${params.toString()}`);
};

export const getTvShowGenres = async () => {
  return await api.get('/genre/tv/list');
};

export const getTvShowsByQuery = async (query: string, page: number) => {
  const params = new URLSearchParams({
    query,
    page: page.toString(),
  });

  return await api.get(`/search/tv?${params.toString()}`);
};
