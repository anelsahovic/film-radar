import ErrorMessage from '@/components/ErrorMessage';
import GenreSelection from '@/components/GenreSelection';
import Loader from '@/components/Loader';
import NoResults from '@/components/NoResults';
import PagePagination from '@/components/PagePagination';
import Search from '@/components/Search';
import SortBySelection from '@/components/SortBySelection';
import TvShowCard from '@/components/TvShowCard';
import {
  getTvShowGenres,
  getTvShows,
  getTvShowsByQuery,
} from '@/services/tv.service';
import type { Genre } from '@/types/movies.types';
import type { TvShow } from '@/types/tv.types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export default function TvShows() {
  const [tvShows, setTvShows] = useState<TvShow[]>([]);
  const [genres, setGenres] = useState<Genre[]>();
  const [genresMap, setGenresMap] = useState<Record<number, string>>({});

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const pageNumber = searchParams.get('page') || '1';
  const sortingValue = searchParams.get('sort_by') || '';
  const selectedGenre = searchParams.get('with_genres') || '';

  // fetch tv shows
  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        setLoading(true);
        setErrorMessage('');

        const response =
          searchQuery.length > 0
            ? await getTvShowsByQuery(searchQuery, Number(pageNumber))
            : await getTvShows(sortingValue, selectedGenre, Number(pageNumber));

        if (response.status === 200) {
          setTvShows(response.data.results);
          searchParams.set('page', response.data.page);
          setTotalPages(Math.min(response.data.total_pages, 500));
          setSearchParams(searchParams);
        } else {
          setErrorMessage('Problem occurred while getting the TV Shows.');
        }
      } catch (error) {
        console.log(error);
        setErrorMessage('Something went wrong :(');
      } finally {
        setLoading(false);
      }
    };

    fetchTvShows();
  }, [
    pageNumber,
    searchParams,
    searchQuery,
    selectedGenre,
    setSearchParams,
    sortingValue,
  ]);

  // fetch tv show genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await getTvShowGenres();

        if (response.status === 200) {
          setGenres(response.data.genres);

          const tempGenresMap: Record<number, string> = {};
          response.data.genres.forEach((genre: Genre) => {
            tempGenresMap[genre.id] = genre.name;
          });

          setGenresMap(tempGenresMap);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGenres();
  }, []);

  const handleSearchQuery = (query: string) => {
    searchParams.set('query', query);
    searchParams.set('page', '1');

    if (query.length === 0) searchParams.delete('query');

    setSearchParams(searchParams);
  };

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  const handleGenreSelect = (genre: string) => {
    searchParams.set('with_genres', genre);
    searchParams.set('filter', 'all');
    searchParams.set('page', '1');

    searchParams.delete('query');

    if (genre === 'default') searchParams.delete('with_genres');

    setSearchParams(searchParams);
  };

  const handleSortBy = (value: string) => {
    searchParams.set('sort_by', value);
    searchParams.set('filter', 'all');
    searchParams.set('page', '1');

    searchParams.delete('query');

    setSearchParams(searchParams);
  };
  return (
    <div className="flex flex-col gap-8 p-4 my-4">
      <title>Film Radar - TV Shows</title>
      {/* search */}
      <div className="flex w-full justify-center px-4">
        <Search
          type="tv"
          searchQuery={searchQuery}
          handleSearchQuery={handleSearchQuery}
        />
      </div>

      {/* filtering */}
      <div></div>

      {/* title and sorting */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* title */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Discover TV Shows
          </h2>
          <h2 className="text-base sm:text-lg md:text-xl text-muted-foreground ">
            Explore TV shows in our collection
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:w-fit max-w-lg items-center p-2 gap-2">
          {/* genre selection */}
          <div className="w-full sm:flex sm:justify-end">
            <GenreSelection
              genres={genres || []}
              selectedGenre={selectedGenre}
              handleGenreSelect={handleGenreSelect}
            />
          </div>

          {/* sort by selection */}
          <div className="w-full sm:flex sm:justify-end">
            <SortBySelection
              type="movie"
              sortingValue={sortingValue}
              handleSortBy={handleSortBy}
            />
          </div>
        </div>
      </div>

      {/* loading state */}
      {loading && !errorMessage && <Loader />}

      {/* error message */}
      {!loading && errorMessage && <ErrorMessage message={errorMessage} />}

      {/* no result found */}
      {!loading && !errorMessage && tvShows.length === 0 && (
        <NoResults type="tv" />
      )}

      {/* rendering tv show cards */}
      {!loading && !errorMessage && tvShows.length > 0 && (
        <div className="w-full justify-center gap-6 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] place-items-center">
          {tvShows.map((show) => (
            <TvShowCard genres={genresMap} key={show.id} tvShow={show} />
          ))}
        </div>
      )}

      {/* pagination */}
      <div className="my-2">
        <PagePagination
          totalPages={totalPages}
          pageNumber={Number(pageNumber)}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
