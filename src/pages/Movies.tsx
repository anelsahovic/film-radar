import ErrorMessage from '@/components/ErrorMessage';
import GenreSelection from '@/components/GenreSelection';
import Loader from '@/components/Loader';
import MovieCard from '@/components/MovieCard';
import NoResults from '@/components/NoResults';
import PagePagination from '@/components/PagePagination';
import Search from '@/components/Search';
import SortBySelection from '@/components/SortBySelection';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import {
  getFilteredMovies,
  getMovieByQuery,
  getMovieGenres,
  getMovies,
} from '@/services/movies.service';
import type { Genre, Movie } from '@/types/movies.types';
import { Calendar, Clapperboard, Flame, PlayCircle, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>();
  const [genresMap, setGenresMap] = useState<Record<number, string>>({});

  const [pageTitle, setPageTitle] = useState('All Movies');
  const [pageSubtitle, setPageSubtitle] = useState('List of all movies');
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFilter = searchParams.get('filter') || 'all';
  const sortingValue = searchParams.get('sort_by') || 'default';
  const selectedGenre = searchParams.get('with_genres') || 'default';
  const searchQuery = searchParams.get('query') || '';
  const pageNumber = searchParams.get('page') || '1';

  // fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setErrorMessage('');

        // find and set movie filter
        const foundFilter = filters.find(
          (item) => item.value === selectedFilter
        );
        if (searchQuery.length > 0) {
          setPageTitle('Movie Search');
          setPageSubtitle(`Showing results for "${searchQuery}"`);
        } else if (foundFilter) {
          setPageTitle(foundFilter.label);
          setPageSubtitle(foundFilter.description);
        }

        // fetch movies based on search query or filter
        const response =
          searchQuery.length > 0
            ? await getMovieByQuery(searchQuery, Number(pageNumber))
            : selectedFilter === 'all'
            ? await getMovies(sortingValue, selectedGenre, Number(pageNumber))
            : await getFilteredMovies(selectedFilter, Number(pageNumber));

        if (response.status === 200) {
          setMovies(response.data.results);
          setTotalPages(Math.min(response.data.total_pages, 500));
          searchParams.set('page', response.data.page);
          setSearchParams(searchParams);
        } else {
          setErrorMessage("Could't fetch the movies");
        }
      } catch (error) {
        console.log(error);
        setErrorMessage('Something went wrong while getting the movies :(');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter, sortingValue, selectedGenre, searchQuery, pageNumber]);

  // fetch movie genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await getMovieGenres();

        if (response.status === 200) {
          setGenres(response.data.genres);
          const genreMap: Record<number, string> = {};
          response.data.genres.forEach(
            (genre: { id: number; name: string }) => {
              genreMap[genre.id] = genre.name;
            }
          );

          setGenresMap(genreMap);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGenres();
  }, []);

  const handleFilterChange = (filter: string) => {
    searchParams.set('filter', filter);
    searchParams.set('page', '1');

    searchParams.delete('sort_by');
    searchParams.delete('with_genres');
    searchParams.delete('query');

    setSearchParams(searchParams);
  };

  const handleSortBy = (value: string) => {
    searchParams.set('sort_by', value);
    searchParams.set('filter', 'all');
    searchParams.set('page', '1');

    searchParams.delete('query');

    setSearchParams(searchParams);
  };

  const handleGenreSelect = (value: string) => {
    searchParams.set('with_genres', value);
    searchParams.set('filter', 'all');
    searchParams.set('page', '1');

    searchParams.delete('query');

    setSearchParams(searchParams);
  };

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  const handleSearchQuery = (query: string) => {
    searchParams.set('query', query);
    searchParams.set('filter', 'all');
    searchParams.set('page', '1');

    searchParams.delete('sort_by');
    searchParams.delete('with_genres');

    if (query.length === 0) searchParams.delete('query');

    setSearchParams(searchParams);
  };

  const filters = [
    {
      value: 'all',
      label: 'All Movies',
      description: 'Explore every movie in our collection',
      icon: <Clapperboard />,
    },
    {
      value: 'now_playing',
      label: 'Now Playing',
      description: 'Catch the latest releases in theaters',
      icon: <PlayCircle />,
    },
    {
      value: 'popular',
      label: 'Popular',
      description: 'Trending films loved by audiences',
      icon: <Flame />,
    },
    {
      value: 'top_rated',
      label: 'Top Rated',
      description: 'Critically acclaimed and fan favorites',
      icon: <Star />,
    },
    {
      value: 'upcoming',
      label: 'Upcoming',
      description: 'Get a sneak peek of what’s next',
      icon: <Calendar />,
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-4 my-4">
      {/* search */}
      <div className="flex justify-center w-full px-4">
        <Search
          type="movies"
          searchQuery={searchQuery ? searchQuery : ''}
          handleSearchQuery={handleSearchQuery}
        />
      </div>

      {/* filter of movie - radio group buttons */}
      <div className="w-full flex justify-center">
        <RadioGroup
          defaultValue="all"
          value={selectedFilter}
          onValueChange={(value) => handleFilterChange(value)}
          className="flex justify-center flex-wrap items-center gap-8 border-b pb-4 sm:pb-0 border-border"
        >
          {filters.map((filter) => (
            <div key={filter.value} className="relative pb-2">
              {/* Hide the radio but keep it as peer */}
              <RadioGroupItem
                value={filter.value}
                id={filter.value}
                className="peer sr-only"
              />

              {/* Label acts like the button */}
              <Label
                htmlFor={filter.value}
                className="cursor-pointer text-sm sm:text-base font-medium text-muted-foreground transition-colors hover:text-foreground peer-data-[state=checked]:text-primary"
              >
                {filter.icon}
                {filter.label}
              </Label>

              {/* Underline that activates when checked */}
              <div className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary scale-x-0 peer-data-[state=checked]:scale-x-100 transition-transform duration-300 origin-center" />
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* title and selections */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* title */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {pageTitle}
          </h2>
          <h2 className="text-base sm:text-lg md:text-xl text-muted-foreground ">
            {pageSubtitle}
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

      {/* Loader */}
      {loading && !errorMessage && <Loader />}

      {/* Error message */}
      {!loading && errorMessage && <ErrorMessage message={errorMessage} />}

      {/* No result found */}
      {!loading && !errorMessage && movies.length === 0 && (
        <NoResults type="movie" />
      )}
      {/* list of movies */}
      {!loading && !errorMessage && movies.length > 0 && (
        <div className="w-full justify-center grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genresMap} />
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
