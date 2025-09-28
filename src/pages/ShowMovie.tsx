import RadialProgress from '@/components/ RadialProgress';
import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  getMovieById,
  getMovieGenres,
  getMovieRecommendations,
  getMovieReviews,
  getMovieVideos,
  getSimilarMovies,
} from '@/services/movies.service';
import type { Movie, MovieDetails } from '@/types/movies.types';
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
  FaYoutube,
} from 'react-icons/fa';
import { useParams } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { intervalToDuration } from 'date-fns';
import ProductionCompanies from '@/components/ProductionCompanies';
import MoviesCarousel from '@/components/MoviesCarousel';
import Reviews from '@/components/Reviews';
import RelatedVideos from '@/components/RelatedVideos';
import type { Genre, Review, Video } from '@/types/shared.types';

export default function ShowMovie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetails>();
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [movieRecommendations, setMovieRecommendations] = useState<Movie[]>([]);
  const [movieReviews, setMovieReviews] = useState<Review[]>([]);
  const [movieVideos, setMovieVideos] = useState<Video[]>([]);
  const [movieTrailers, setMovieTrailers] = useState<Video[]>([]);
  const [genresMap, setGenresMap] = useState<Record<number, string>>({});
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
    const fetchSimilarMovies = async () => {
      try {
        const response = await getSimilarMovies(movieId!);

        if (response.status === 200) {
          setSimilarMovies(response.data.results);
        } else {
          console.log('No similar movies available');
        }
      } catch (error) {
        console.log(error);
        console.log('No similar movies available');
      }
    };

    const fetchMovieRecommendations = async () => {
      try {
        const response = await getMovieRecommendations(movieId!);

        if (response.status === 200) {
          setMovieRecommendations(response.data.results);
        } else {
          console.log('No movie recommendations available');
        }
      } catch (error) {
        console.log(error);
        console.log('No movie recommendations available');
      }
    };

    const fetchMovieReviews = async () => {
      try {
        const response = await getMovieReviews(movieId!);

        if (response.status === 200) {
          setMovieReviews(response.data.results);
        } else {
          console.log('No movie reviews available');
        }
      } catch (error) {
        console.log(error);
        console.log('No movie reviews available');
      }
    };

    const fetchMovieVideos = async () => {
      try {
        const response = await getMovieVideos(movieId!);

        if (response.status === 200) {
          setMovieVideos(
            response.data.results.filter(
              (video: Video) => video.site.toLowerCase() === 'youtube'
            )
          );
          setMovieTrailers(
            response.data.results
              .filter(
                (video: Video) =>
                  video.site.toLowerCase() === 'youtube' &&
                  video.type.toLowerCase() === 'trailer'
              )
              .slice(0, 2)
          );
        } else {
          console.log('No movie videos available');
        }
      } catch (error) {
        console.log(error);
        console.log('No movie videos available');
      }
    };

    fetchMovie();
    fetchSimilarMovies();
    fetchMovieRecommendations();
    fetchMovieReviews();
    fetchMovieVideos();
  }, [movieId]);

  // fetch movie genres
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
      value: movie.release_date
        ? formatDate(movie.release_date, 'dd/MM/yyyy')
        : 'N/A',
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

  const posterImageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : '/images/no_poster_placeholder.svg';

  const heroImageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '/images/no_poster_placeholder.svg';

  const metaTitle = `${movie?.title} - Film Radar - Discover movies, TV shows, and people.`;
  return (
    <div>
      <title>{metaTitle}</title>
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
              backgroundImage: `url(${heroImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="relative container mx-auto px-10 flex flex-col sm:flex-row gap-6 sm:gap-8 pb-6 sm:pb-8 items-center">
              {/* Poster */}
              <img
                src={posterImageUrl}
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
                <div className="flex items-center gap-4 flex-wrap">
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

                  {/* trailers */}
                  {movieTrailers.map((trailer, index) => (
                    <a
                      key={trailer.id}
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={twMerge(
                        buttonVariants({ variant: 'secondary' })
                      )}
                    >
                      <FaYoutube className="size-5 text-red-500" />
                      Watch Trailer {index + 1}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col gap-12 p-6 md:px-10">
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

            {/* Related videos */}
            {movieVideos.length > 0 && <RelatedVideos videos={movieVideos} />}

            {/* Similar Movies */}
            {similarMovies.length > 0 && (
              <MoviesCarousel
                sectionTitle="You Might Also Like"
                movies={similarMovies}
                genres={genresMap}
              />
            )}

            {/* Movie Recommendations */}
            {movieRecommendations.length > 0 && (
              <MoviesCarousel
                sectionTitle="Our Recommendations"
                movies={movieRecommendations}
                genres={genresMap}
              />
            )}

            {/* Movie Reviews */}
            <Reviews reviews={movieReviews} />

            {/* Production Companies */}
            {movie.production_companies.length > 0 && (
              <ProductionCompanies companies={movie.production_companies} />
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
