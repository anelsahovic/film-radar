import api from './axios';

export const getTvShows = async (sort: string, genre: string, page: number) => {
  const params = new URLSearchParams({ page: page.toString() });

  if (sort !== 'default') {
    params.append('sort_by', sort);
  }
  if (genre !== 'default') {
    params.append('with_genres', genre);
  }

  return await api.get(`/discover/tv?${params.toString()}`);
};

export const getTvShowsByFilter = async (filter: string, page: number) => {
  const params = new URLSearchParams({
    page: page.toString(),
  });

  return await api.get(`/tv/${filter}?${params.toString()}`);
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
