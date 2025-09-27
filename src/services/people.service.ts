import api from './axios';

export const getPopularPeople = async (page: number) => {
  const params = new URLSearchParams({ page: page.toString() });

  return await api.get(`/person/popular?${params.toString()}`);
};

export const getPeopleByQuery = async (query: string, page: number) => {
  const params = new URLSearchParams({
    query,
    page: page.toString(),
  });

  return await api.get(`/search/person?${params.toString()}`);
};

export const getPersonById = async (personId: string) => {
  return await api.get(`/person/${personId}`);
};

export const getPersonMovieCredits = async (personId: string) => {
  return await api.get(`/person/${personId}/movie_credits`);
};

export const getPersonTvShowCredits = async (personId: string) => {
  return await api.get(`/person/${personId}/tv_credits`);
};
