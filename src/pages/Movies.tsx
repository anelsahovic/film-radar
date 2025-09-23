import GenreSelection from '@/components/GenreSelection';
import MovieCard from '@/components/MovieCard';
import SortBySelection from '@/components/SortBySelection';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import {
  getFilteredMovies,
  getMovieGenres,
  getMovies,
} from '@/services/movies.service';
import type { Genre, Movie } from '@/types/movies';
import { Calendar, Clapperboard, Flame, PlayCircle, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LuSearch } from 'react-icons/lu';

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>();
  const [genresMap, setGenresMap] = useState<Record<number, string>>({});
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortingValue, setSortingValue] = useState('default');
  const [selectedGenre, setSelectedGenre] = useState('default');
  const [pageTitle, setPageTitle] = useState('All Movies');
  const [pageSubtitle, setPageSubtitle] = useState('List of all movies');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setErrorMessage('');

        // find and set movie filter
        const foundFilter = filters.find(
          (item) => item.value === selectedFilter
        );
        if (foundFilter) {
          setPageTitle(foundFilter.label);
          setPageSubtitle(foundFilter.description);
        }

        // fetch movies based on filter
        const response =
          selectedFilter === 'all'
            ? await getMovies(sortingValue, selectedGenre)
            : await getFilteredMovies(selectedFilter);

        if (response.status === 200) {
          setMovies(response.data.results);
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
  }, [selectedFilter, sortingValue, selectedGenre]);

  //  fetch movie genres
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
    setSelectedFilter(filter);
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
        <div className="relative w-full max-w-lg">
          {/* Search Icon */}
          <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />

          {/* Input */}
          <Input
            placeholder="Search movies..."
            className="
            pl-12 pr-4 h-10 sm:h-11 md:h-12 w-full rounded-full
            bg-background/70  border border-border text-sm sm:text-base md:text-lg
            focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
            transition-all font-semibold duration-300
          "
          />
        </div>
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
              setSelectedGenre={setSelectedGenre}
              setSelectedFilter={setSelectedFilter}
            />
          </div>

          {/* sort by selection */}
          <div className="w-full sm:flex sm:justify-end">
            <SortBySelection
              type="movie"
              sortingValue={sortingValue}
              setSortingValue={setSortingValue}
              setSelectedFilter={setSelectedFilter}
            />
          </div>
        </div>
      </div>

      {/* list of movies */}
      {loading && !errorMessage && <span>Loading...</span>}

      {!loading && errorMessage && (
        <span className="text-red-500">{errorMessage}</span>
      )}

      {!loading && !errorMessage && movies.length === 0 && (
        <span>No movies found.</span>
      )}

      {!loading && !errorMessage && movies.length > 0 && (
        <div className="w-full justify-center grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genresMap} />
          ))}
        </div>
      )}
    </div>
  );
}
