import RadialProgress from '@/components/ RadialProgress';
import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import ProductionCompanies from '@/components/ProductionCompanies';
import RelatedVideos from '@/components/RelatedVideos';
import type { Review } from '@/components/ReviewCard';
import Reviews from '@/components/Reviews';
import SeasonsCollapsible from '@/components/SeasonsCollapsible';
import TvShowsCarousel from '@/components/TvShowsCarousel';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  getSimilarTvShows,
  getTvShowById,
  getTvShowGenres,
  getTvShowRecommendations,
  getTvShowReviews,
  getTvShowVideos,
} from '@/services/tv.service';
import type { Genre, Video } from '@/types/movies.types';
import type { TvShow, TvShowDetails } from '@/types/tv.types';
import { getYear } from 'date-fns';
import { useEffect, useState, type JSX } from 'react';
import { FaExternalLinkAlt, FaYoutube } from 'react-icons/fa';
import {
  FiActivity,
  FiFilm,
  FiFlag,
  FiGlobe,
  FiStar,
  FiTv,
} from 'react-icons/fi';
import { useParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

export default function ShowTvShow() {
  const { tvId } = useParams();

  const [tvShow, setTvShow] = useState<TvShowDetails>();
  const [similarTvShows, setSimilarTvShows] = useState<TvShow[]>([]);
  const [tvShowRecommendations, setTvShowRecommendations] = useState<TvShow[]>(
    []
  );
  const [tvShowReviews, setTvShowReviews] = useState<Review[]>([]);
  const [tvShowVideos, setTvShowVideos] = useState<Video[]>([]);
  const [tvShowTrailers, setTvShowTrailers] = useState<Video[]>([]);
  const [genresMap, setGenresMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // fetch tv shows
  useEffect(() => {
    const fetchTvShow = async () => {
      try {
        setLoading(true);
        setErrorMessage('');

        const response = await getTvShowById(tvId!);

        if (response.status === 200) {
          setTvShow(response.data);
        } else {
          setErrorMessage("That TV Show doesn't exist");
        }
      } catch (error) {
        console.log(error);
        setErrorMessage("We can't find that TV Show right now :(");
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarTvShows = async () => {
      try {
        const response = await getSimilarTvShows(tvId!);

        if (response.status === 200) {
          setSimilarTvShows(response.data.results);
        } else {
          console.log('No similar tv shows available');
        }
      } catch (error) {
        console.log(error);
        console.log('No similar tv shows available');
      }
    };

    const fetchTvShowRecommendations = async () => {
      try {
        const response = await getTvShowRecommendations(tvId!);

        if (response.status === 200) {
          setTvShowRecommendations(response.data.results);
        } else {
          console.log('No tv show recommendations available');
        }
      } catch (error) {
        console.log(error);
        console.log('No tv show recommendations available');
      }
    };

    const fetchTvShowReviews = async () => {
      try {
        const response = await getTvShowReviews(tvId!);

        if (response.status === 200) {
          setTvShowReviews(response.data.results);
        } else {
          console.log('No tv show reviews available');
        }
      } catch (error) {
        console.log(error);
        console.log('No tv show reviews available');
      }
    };

    const fetchTvShowVideos = async () => {
      try {
        const response = await getTvShowVideos(tvId!);

        if (response.status === 200) {
          setTvShowVideos(
            response.data.results.filter(
              (video: Video) => video.site.toLowerCase() === 'youtube'
            )
          );
          setTvShowTrailers(
            response.data.results
              .filter(
                (video: Video) =>
                  video.site.toLowerCase() === 'youtube' &&
                  video.type.toLowerCase() === 'trailer'
              )
              .slice(0, 2)
          );
        } else {
          console.log('No tv show videos available');
        }
      } catch (error) {
        console.log(error);
        console.log('No tv show videos available');
      }
    };

    fetchTvShow();
    fetchSimilarTvShows();
    fetchTvShowRecommendations();
    fetchTvShowReviews();
    fetchTvShowVideos();
  }, [tvId]);

  // fetch tv show genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await getTvShowGenres();

        if (response.status === 200) {
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

  const detailsData = [
    { label: 'Original name', value: tvShow?.original_name, icon: <FiTv /> },
    {
      label: 'Rating',
      value: `${tvShow?.vote_average.toFixed(1)} (${tvShow?.vote_count} votes)`,
      icon: <FiStar />,
    },
    { label: 'Status', value: tvShow?.status, icon: <FiActivity /> },
    { label: 'Type', value: tvShow?.type, icon: <FiFilm /> },
    {
      label: 'Language',
      value: tvShow?.original_language?.toUpperCase(),
      icon: <FiGlobe />,
    },
    {
      label: 'Country',
      value: tvShow?.origin_country?.join(', '),
      icon: <FiFlag />,
    },
  ];

  const posterImageUrl = tvShow?.poster_path
    ? `https://image.tmdb.org/t/p/original${tvShow?.poster_path}`
    : '/images/no_poster_placeholder.svg';

  const heroImageUrl = tvShow?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${tvShow?.backdrop_path}`
    : '/images/no_poster_placeholder.svg';

  const metaTitle = `${tvShow?.name} - Film Radar - Discover tvShows, TV shows, and people.`;
  return (
    <div>
      <title>{metaTitle}</title>
      {/* Loader */}
      {loading && !errorMessage && <Loader />}

      {/* Error message */}
      {!loading && errorMessage && <ErrorMessage message={errorMessage} />}

      {!loading && !errorMessage && tvShow && (
        <div className="w-full min-h-screen bg-background text-foreground">
          {/* Hero Section */}
          <div
            className="relative w-full h-full sm:min-h-[60vh] md:min-h-[70vh] flex items-end pt-5"
            style={{
              backgroundImage: `url(${heroImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

            <div className="relative container mx-auto px-4 flex flex-col sm:flex-row gap-6 sm:gap-8 pb-6 sm:pb-8 items-center">
              {/* Poster */}
              {tvShow.poster_path && (
                <img
                  src={posterImageUrl}
                  alt={tvShow.name}
                  className="w-48 sm:w-48 md:w-56 rounded-lg shadow-lg flex-shrink-0"
                />
              )}

              {/* Basic Info */}
              <div className="h-full flex-1 flex flex-col justify-between items-start gap-4">
                {/* title and rating */}
                <div className="flex items-center gap-4">
                  <RadialProgress
                    size={50}
                    rating={tvShow.vote_average.toFixed(1)}
                    progress={tvShow.vote_average * 10}
                  />

                  <div className="flex flex-col items-start">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                      {tvShow.name}
                    </h1>
                    {tvShow.tagline && (
                      <p className="text-muted-foreground italic ">
                        {tvShow.tagline}
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* network/seasons/episodes/year/runtime */}
                <div className="flex flex-wrap items-center gap-4 text-sm ">
                  {/* Networks */}
                  {tvShow.networks.length > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-2">
                        {tvShow.networks.map((network) => (
                          <span
                            key={network.id}
                            className="px-2 py-1 bg-neutral-700/70 backdrop-blur-2xl text-zinc-100 rounded-md text-xs tracking-wider leading-relaxed"
                          >
                            {network.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-4 font-black text-muted-foreground">
                    {/* Seasons / Episodes */}

                    <span>{tvShow.number_of_seasons} Seasons</span>
                    <span>{tvShow.number_of_episodes} Episodes</span>

                    {/* Runtime */}
                    {tvShow.episode_run_time?.length > 0 && (
                      <span>{tvShow.episode_run_time[0]} min</span>
                    )}

                    {/* Year */}
                    <span>
                      {tvShow.first_air_date
                        ? getYear(tvShow.first_air_date)
                        : 'N/A'}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* overview */}
                <div>
                  <p className="text-muted-foreground leading-relaxed">
                    {tvShow.overview}
                  </p>
                </div>

                {/* genres */}
                <div className="flex flex-wrap gap-2">
                  {tvShow.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-neutral-900/70 backdrop-blur-2xl text-zinc-100 rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* links */}
                <div className="flex items-center gap-4 flex-wrap">
                  {tvShow.homepage && (
                    <a
                      href={tvShow.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={twMerge(buttonVariants())}
                    >
                      <FaExternalLinkAlt className="size-4" />
                      Official Page
                    </a>
                  )}

                  {/* trailers */}
                  {tvShowTrailers.map((trailer, index) => (
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

          {/* Details Section */}
          <div className="flex flex-col gap-12 p-6 md:px-10">
            {/* seasons and details */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
              {/*Left - Seasons */}
              <div className="md:col-span-2">
                <SeasonsCollapsible seasons={tvShow.seasons} />
              </div>

              {/* Details */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Details</h2>
                <ul className="divide-y">
                  {detailsData.map((item) => (
                    <DetailsCard
                      key={item.value}
                      icon={item.icon}
                      label={item.label}
                      value={item.value || 'N/A'}
                    />
                  ))}
                </ul>
              </div>
            </section>

            {/* Tv show youtube videos */}
            {tvShowVideos.length > 0 && <RelatedVideos videos={tvShowVideos} />}

            {/* similar tv shows */}
            {similarTvShows.length > 0 && (
              <TvShowsCarousel
                sectionTitle="You Might Also Like"
                tvShows={similarTvShows}
                genres={genresMap}
              />
            )}

            {/* tv show recommendations*/}
            {tvShowRecommendations.length > 0 && (
              <TvShowsCarousel
                sectionTitle="Our Recommendations"
                tvShows={tvShowRecommendations}
                genres={genresMap}
              />
            )}

            <Reviews reviews={tvShowReviews} />

            {/* Production Companies */}
            {tvShow.production_companies.length > 0 && (
              <ProductionCompanies companies={tvShow.production_companies} />
            )}

            {/* Production Countries */}
            {tvShow.production_countries.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Production Countries
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tvShow.production_countries.map((country) => (
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
            {tvShow.spoken_languages.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Spoken Languages
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tvShow.spoken_languages.map((lang) => (
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
    <li className="flex items-center gap-3 py-3">
      <span className="text-primary w-6 h-6 flex items-center justify-center">
        {icon}
      </span>
      <span className="text-sm">
        <strong>{label}:</strong> {value}
      </span>
    </li>
  );
}
