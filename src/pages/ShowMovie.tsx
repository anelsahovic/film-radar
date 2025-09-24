import RadialProgress from '@/components/ RadialProgress';
import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getMovieById } from '@/services/movies.service';
import type { MovieDetails } from '@/types/movies.types';
import { formatDate, getYear } from 'date-fns';
import { useEffect, useState, type JSX } from 'react';
import {
  FaStar,
  FaChartLine,
  FaLanguage,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaGlobeAmericas,
  FaFilm,
  FaExternalLinkAlt,
  FaImdb,
  FaRegCheckCircle,
} from 'react-icons/fa';
import { useParams } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { intervalToDuration } from 'date-fns';

export default function ShowMovie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetails>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // fetch movie from id
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setErrorMessage('');

        const response = await getMovieById(movieId!);

        if (response.status === 200) {
          setMovie(response.data);
          console.log(response.data);
        } else {
          setErrorMessage("That movie doesn't exist");
        }
      } catch (error) {
        console.log(error);
        setErrorMessage("We can't find that movie right now :(");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return;
  }

  const formatRuntime = (minutes: number) => {
    const dur = intervalToDuration({ start: 0, end: minutes * 60 * 1000 });
    return `${dur.hours || 0}h ${dur.minutes || 0}m`;
  };

  const detailsData = [
    {
      label: 'Original Title',
      value: movie.original_title,
      icon: <FaFilm />,
    },
    {
      label: 'Rating',
      value: ` ${movie.vote_average.toFixed(1)} (${movie.vote_count} votes)`,
      icon: <FaStar />,
    },
    {
      label: 'Popularity',
      value: movie.popularity.toFixed(1),
      icon: <FaChartLine />,
    },
    {
      label: 'Original Language',
      value: movie.original_language.toUpperCase(),
      icon: <FaLanguage />,
    },
    {
      label: 'Release Date',
      value: formatDate(movie.release_date, 'dd/MM/yyyy'),
      icon: <FaCalendarAlt />,
    },
    {
      label: 'Duration',
      value: formatRuntime(movie.runtime!),
      icon: <FaClock />,
    },
    {
      label: 'Budget',
      value: movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : 'N/A',
      icon: <FaMoneyBillWave />,
    },
    {
      label: 'Revenue',
      value: movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : 'N/A',
      icon: <FaMoneyBillWave />,
    },
    {
      label: 'Origin Country',
      value: movie.origin_country.join(', '),
      icon: <FaGlobeAmericas />,
    },

    {
      label: 'Status',
      value: movie.status,
      icon: <FaRegCheckCircle />,
    },
  ];
  return (
    <div>
      {/* Loader */}
      {loading && !errorMessage && <Loader />}

      {/* Error message */}
      {!loading && errorMessage && <ErrorMessage message={errorMessage} />}

      {!loading && !errorMessage && movie && (
        <div className="min-h-screen bg-background text-foreground">
          {/* Hero Image Background */}
          <div
            className="relative w-full h-full sm:min-h-[60vh] md:min-h-[70vh] flex items-end pt-5"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="relative container mx-auto px-4 flex flex-col sm:flex-row gap-6 sm:gap-8 pb-6 sm:pb-8 items-center">
              {/* Poster */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-48 sm:w-48 md:w-56 rounded-lg shadow-lg flex-shrink-0"
              />

              {/* Info */}
              <div className="h-full flex-1 flex flex-col justify-between items-start gap-4">
                {/* title and rating */}
                <div className="flex items-center gap-4">
                  <RadialProgress
                    size={50}
                    rating={movie.vote_average.toFixed(1)}
                    progress={movie.vote_average * 10}
                  />

                  <div className="flex flex-col items-start">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                      {movie.title}
                    </h1>
                    {movie.tagline && (
                      <p className="text-muted-foreground italic ">
                        {movie.tagline}
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Badges */}
                <div className="flex flex-wrap gap-2 ">
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full">
                    {movie.release_date && getYear(movie.release_date)}
                  </span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full">
                    {movie.runtime ? movie.runtime : 'N/A'} min
                  </span>
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <Separator />

                {/* overview */}
                <div>
                  <p className="text-muted-foreground leading-relaxed">
                    {movie.overview}
                  </p>
                </div>

                {/* links */}
                <div className="flex  items-center gap-4 ">
                  {movie.homepage && (
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={twMerge(buttonVariants())}
                    >
                      <FaExternalLinkAlt className="size-4" />
                      Official Page
                    </a>
                  )}

                  {movie.imdb_id && (
                    <a
                      href={`https://www.imdb.com/title/${movie.imdb_id}`}
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
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-10 space-y-12">
            {/* Quick Stats */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Details</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {detailsData.map((item) => (
                  <DetailsCard
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            </section>

            {/* Production Companies */}
            {movie.production_companies.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Production Companies
                </h2>
                <div className="flex flex-wrap gap-4">
                  {movie.production_companies.map((company) => (
                    <div
                      key={company.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card transition-shadow duration-300"
                    >
                      {company.logo_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                          alt={company.name}
                          className="h-10 sm:h-12 object-contain rounded"
                        />
                      )}
                      <span className="font-medium text-foreground">
                        {company.name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Production Countries */}
            {movie.production_countries.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Production Countries
                </h2>
                <div className="flex flex-wrap gap-2">
                  {movie.production_countries.map((country) => (
                    <span
                      key={country.iso_3166_1}
                      className="px-4 py-2 bg-primary/20 text-primary font-medium rounded-full shadow-sm"
                    >
                      {country.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Spoken Languages */}
            {movie.spoken_languages.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Spoken Languages
                </h2>
                <div className="flex flex-wrap gap-2">
                  {movie.spoken_languages.map((lang) => (
                    <span
                      key={lang.iso_639_1}
                      className="px-4 py-2 bg-accent-foreground text-secondary font-medium rounded-full shadow-sm"
                    >
                      {lang.english_name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DetailsCard({
  icon,
  label,
  value,
}: {
  icon: JSX.Element;
  label: string;
  value: string | JSX.Element;
}) {
  return (
    <div className="p-4 rounded-lg bg-card  flex items-start gap-3">
      <div className="text-primary text-lg">{icon}</div>
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-lg font-semibold">{value}</span>
      </div>
    </div>
  );
}
