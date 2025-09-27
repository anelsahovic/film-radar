import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import MoviesCarousel from '@/components/MoviesCarousel';
import TvShowsCarousel from '@/components/TvShowsCarousel';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getMovieGenres } from '@/services/movies.service';
import {
  getPersonById,
  getPersonMovieCredits,
  getPersonTvShowCredits,
} from '@/services/people.service';
import type { Genre, Movie } from '@/types/movies.types';
import type { PersonDetails } from '@/types/people.types';
import type { TvShow } from '@/types/tv.types';
import { formatDate } from 'date-fns';
import { useEffect, useState } from 'react';
import { FaExternalLinkAlt, FaImdb } from 'react-icons/fa';
import { useParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

export default function ShowPerson() {
  const { personId } = useParams();
  const [person, setPerson] = useState<PersonDetails>();
  const [tvShows, setTvShows] = useState<TvShow[]>([]);
  const [genresMap, setGenresMap] = useState<Record<number, string>>({});
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // fetch person and credits
  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setLoading(true);
        setErrorMessage('');

        const response = await getPersonById(personId!);

        if (response.status === 200) {
          setPerson(response.data);
        } else {
          setErrorMessage("That person doesn't exist");
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("We can't find that person right now :(");
      } finally {
        setLoading(false);
      }
    };

    const fetchMovieCredits = async () => {
      try {
        const response = await getPersonMovieCredits(personId!);

        if (response.status === 200) {
          setMovies(
            response.data.cast.length > 0
              ? response.data.cast
              : response.data.crew
          );
        } else {
          console.log('No movie credits available');
        }
      } catch (error) {
        console.log(error);
        console.log('No movie credits available');
      }
    };

    const fetchTvShowCredits = async () => {
      try {
        const response = await getPersonTvShowCredits(personId!);

        if (response.status === 200) {
          setTvShows(
            response.data.cast.length > 0
              ? response.data.cast
              : response.data.crew
          );
        } else {
          console.log('No tv show credits available');
        }
      } catch (error) {
        console.log(error);
        console.log('No tv show credits available');
      }
    };

    fetchPerson();
    fetchMovieCredits();
    fetchTvShowCredits();
  }, [personId]);

  // fetch  genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await getMovieGenres();

        if (response.status === 200) {
          const tempGenreMap: Record<number, string> = {};
          response.data.genres.forEach((genre: Genre) => {
            tempGenreMap[genre.id] = genre.name;
          });

          setGenresMap(tempGenreMap);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGenres();
  }, []);

  const metaTitle = `${person?.name} - Film Radar - Discover movies, TV shows, and people.`;

  const getGender = (gender: number) => {
    switch (gender) {
      case 1:
        return 'Female';
      case 2:
        return 'Male';
      case 3:
        return 'Non-binary';
      default:
        return 'Not specified';
    }
  };

  if (!person) return;

  const details: { label: string; value: string }[] = [
    {
      label: 'Place of Birth',
      value: person?.place_of_birth || '',
    },
    {
      label: 'Born',
      value: person?.birthday
        ? formatDate(person.birthday, 'dd/MM/yyyy')
        : 'N/A',
    },
    {
      label: 'Died',
      value: person?.deathday
        ? formatDate(person.deathday, 'dd/MM/yyyy')
        : 'N/A',
    },
    {
      label: 'Gender',
      value: getGender(person?.gender || 0),
    },
    {
      label: 'Popularity',
      value: person?.popularity?.toFixed(1) || 'N/A',
    },
  ];

  return (
    <div className="container py-8">
      <title>{metaTitle}</title>

      {/* Loader */}
      {loading && !errorMessage && <Loader />}

      {/* Error */}
      {!loading && errorMessage && <ErrorMessage message={errorMessage} />}

      {/* Person Page */}
      {!loading && !errorMessage && person && (
        <div className="space-y-10 p-2">
          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start px-4">
            {/* left - image and details */}
            <div className="flex flex-col items-center gap-4">
              {/* Profile Image */}
              <img
                src={
                  person.profile_path
                    ? `${IMAGE_BASE_URL}${person.profile_path}`
                    : '/images/no_image.png'
                }
                alt={person.name}
                className="h-72 object-cover rounded-2xl shadow-lg"
              />

              {/* name and department badge */}
              <div className="flex flex-col items-center justify-center gap-1">
                <h1 className="text-3xl font-bold">{person.name}</h1>
                <Badge>{person.known_for_department}</Badge>
              </div>

              {/* details and links */}
              <div className="flex flex-col gap-4 min-w-[250px]">
                {/* details */}
                <div className="flex flex-col gap-2">
                  {details.map((item) => (
                    <div
                      key={item?.value}
                      className="flex justify-between gap-2 border-b border-gray-700 pb-1"
                    >
                      <span className="text-muted-foreground">
                        {item?.label}
                      </span>
                      <span className="font-medium text-foreground">
                        {item?.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* links */}
                <div className="flex items-center gap-4 flex-wrap">
                  {person.homepage && (
                    <a
                      href={person.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={twMerge(buttonVariants())}
                    >
                      <FaExternalLinkAlt className="size-4" />
                      Official Page
                    </a>
                  )}

                  {person.imdb_id && (
                    <a
                      href={`https://www.imdb.com/name/${person.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={twMerge(
                        buttonVariants({ variant: 'secondary' })
                      )}
                    >
                      <FaImdb className="size-6 text-amber-400" />
                      IMDb Page
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* right - Biography */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-2">Biography</h2>
              <Separator className="mb-4" />
              <p className="leading-relaxed tracking-wide text-muted-foreground text-justify">
                {person.biography || 'No biography available.'}
              </p>

              {/* Also Known As */}
              {person.also_known_as.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-2xl font-semibold mb-2">Also Known As</h3>
                  <Separator className="mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {person.also_known_as.map((aka, i) => (
                      <Badge key={i} variant="secondary">
                        {aka}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* known for (Movies and tv shows) credits */}
          <div className="flex flex-col gap-8 px-4">
            {movies.length > 0 && (
              <MoviesCarousel
                sectionTitle="Movies Credits"
                movies={movies}
                genres={genresMap}
              />
            )}

            {tvShows.length > 0 && (
              <TvShowsCarousel
                sectionTitle="TV Shows Credits"
                tvShows={tvShows}
                genres={genresMap}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
