import CarouselSkeleton from '@/components/CarouselSkeleton';
import ErrorMessage from '@/components/ErrorMessage';
import HomeHeroSkeleton from '@/components/HomeHeroSkeleton';
import MoviesCarousel from '@/components/MoviesCarousel';
import TvShowsCarousel from '@/components/TvShowsCarousel';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  getAllTrendingMedia,
  getMovieGenres,
  getMoviesByFilter,
} from '@/services/movies.service';
import { getTvShowGenres, getTvShowsByFilter } from '@/services/tv.service';
import type { Movie } from '@/types/movies.types';
import type { AllTrendingMedia, Genre } from '@/types/shared.types';
import type { TvShow } from '@/types/tv.types';
import { formatDate, getYear } from 'date-fns';
import { Heart, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa6';
import { FiCalendar, FiStar, FiTv } from 'react-icons/fi';
import { MdOutlineLocalMovies } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

export default function Home() {
  const [trendingMedia, setTrendingMedia] = useState<AllTrendingMedia[]>([]);
  const [trendingMediaActiveIndex, setTrendingMediaActiveIndex] = useState(0);
  const [trendingMediaLoading, setTrendingMediaLoading] = useState(true);
  const [trendingMediaError, setTrendingMediaError] = useState('');

  // movies states
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularMoviesLoading, setPopularMoviesLoading] = useState(true);
  const [popularMoviesError, setPopularMoviesError] = useState('');
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [nowPlayingMoviesLoading, setNowPlayingMoviesLoading] = useState(true);
  const [nowPlayingMoviesError, setNowPlayingMoviesError] = useState('');
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [upcomingMoviesLoading, setUpcomingMoviesLoading] = useState(true);
  const [upcomingMoviesError, setUpcomingMoviesError] = useState('');

  // tv shows states
  const [popularTvShows, setPopularTvShows] = useState<TvShow[]>([]);
  const [popularTvShowsLoading, setPopularTvShowsLoading] = useState(true);
  const [popularTvShowsError, setPopularTvShowsError] = useState('');
  const [topRatedTvShows, setTopRatedTvShows] = useState<TvShow[]>([]);
  const [topRatedTvShowsLoading, setTopRatedTvShowsLoading] = useState(true);
  const [topRatedTvShowsError, setTopRatedTvShowsError] = useState('');

  const [moviesGenresMap, setMoviesGenresMap] = useState<
    Record<number, string>
  >({});
  const [tvGenresMap, setTvGenresMap] = useState<Record<number, string>>({});

  // fetch media
  useEffect(() => {
    // fetch trending media fort hero section
    const fetchAllTrendingMedia = async () => {
      try {
        setTrendingMediaLoading(true);
        setTrendingMediaError('');

        const response = await getAllTrendingMedia('day');
        if (response.status === 200) {
          setTrendingMedia(
            response.data.results.filter(
              (media: AllTrendingMedia) =>
                media.media_type === 'movie' || media.media_type === 'tv'
            )
          );
        } else {
          setTrendingMediaError("We can't show trending media at the moment");
        }
      } catch (error) {
        console.log(error);
        setTrendingMediaError(
          'Problem appeared while getting the trending media'
        );
      } finally {
        setTrendingMediaLoading(false);
      }
    };

    // fetch popular movies
    const fetchPopularMovies = async () => {
      try {
        setPopularMoviesLoading(true);
        setPopularMoviesError('');

        const response = await getMoviesByFilter('popular', 1);
        if (response.status === 200) {
          setPopularMovies(response.data.results);
        } else {
          setPopularMoviesError("We can't show popular movies at the moment");
        }
      } catch (error) {
        console.log(error);
        setPopularMoviesError(
          'Problem appeared while getting the popular movies'
        );
      } finally {
        setPopularMoviesLoading(false);
      }
    };

    // fetch now playing movies
    const fetchNowPlayingMovies = async () => {
      try {
        setNowPlayingMoviesLoading(true);
        setNowPlayingMoviesError('');

        const response = await getMoviesByFilter('now_playing', 1);
        if (response.status === 200) {
          setNowPlayingMovies(response.data.results);
        } else {
          setNowPlayingMoviesError(
            "We can't show now playing movies at the moment"
          );
        }
      } catch (error) {
        console.log(error);
        setNowPlayingMoviesError(
          'Problem appeared while getting the now playing movies'
        );
      } finally {
        setNowPlayingMoviesLoading(false);
      }
    };

    // fetch upcoming movies
    const fetchUpcomingMovies = async () => {
      try {
        setUpcomingMoviesLoading(true);
        setUpcomingMoviesError('');

        const response = await getMoviesByFilter('upcoming', 1);
        if (response.status === 200) {
          setUpcomingMovies(response.data.results);
        } else {
          setUpcomingMoviesError("We can't show upcoming movies at the moment");
        }
      } catch (error) {
        console.log(error);
        setUpcomingMoviesError(
          'Problem appeared while getting the upcoming movies'
        );
      } finally {
        setUpcomingMoviesLoading(false);
      }
    };

    // fetch popular tv shows
    const fetchPopularTvShows = async () => {
      try {
        setPopularTvShowsLoading(true);
        setPopularTvShowsError('');

        const response = await getTvShowsByFilter('popular', 1);
        if (response.status === 200) {
          setPopularTvShows(response.data.results);
        } else {
          setPopularTvShowsError(
            "We can't show popular tv shows at the moment"
          );
        }
      } catch (error) {
        console.log(error);
        setPopularTvShowsError(
          'Problem appeared while getting the popular tv shows'
        );
      } finally {
        setPopularTvShowsLoading(false);
      }
    };

    // fetch top rated tv shows
    const fetchTopRatedTvShows = async () => {
      try {
        setTopRatedTvShowsLoading(true);
        setTopRatedTvShowsError('');

        const response = await getTvShowsByFilter('top_rated', 1);
        if (response.status === 200) {
          setTopRatedTvShows(response.data.results);
        } else {
          setTopRatedTvShowsError(
            "We can't show top rated tv shows at the moment"
          );
        }
      } catch (error) {
        console.log(error);
        setTopRatedTvShowsError(
          'Problem appeared while getting the top rated tv shows'
        );
      } finally {
        setTopRatedTvShowsLoading(false);
      }
    };

    fetchAllTrendingMedia();
    fetchPopularMovies();
    fetchNowPlayingMovies();
    fetchUpcomingMovies();
    fetchPopularTvShows();
    fetchTopRatedTvShows();
  }, []);

  // loop through the media on hero
  useEffect(() => {
    if (trendingMedia.length === 0) return;

    const interval = setInterval(() => {
      setTrendingMediaActiveIndex((prev) => (prev + 1) % trendingMedia.length);
    }, 5000); // 5s per slide

    return () => clearInterval(interval);
  }, [trendingMedia]);

  // fetch genres
  useEffect(() => {
    const fetchMovieGenres = async () => {
      try {
        const response = await getMovieGenres();

        if (response.status === 200) {
          const tempGenreMap: Record<number, string> = {};
          response.data.genres.forEach((genre: Genre) => {
            tempGenreMap[genre.id] = genre.name;
          });

          setMoviesGenresMap(tempGenreMap);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTvShowGenres = async () => {
      try {
        const response = await getTvShowGenres();

        if (response.status === 200) {
          const tempGenreMap: Record<number, string> = {};
          response.data.genres.forEach((genre: Genre) => {
            tempGenreMap[genre.id] = genre.name;
          });

          setTvGenresMap(tempGenreMap);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieGenres();
    fetchTvShowGenres();
  }, []);

  const activeTrendingMedia = trendingMedia[trendingMediaActiveIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Loader for hero - trending media */}
      {trendingMediaLoading && !trendingMediaError && <HomeHeroSkeleton />}

      {/* Error message for hero - trending media */}
      {!trendingMediaLoading && trendingMediaError && (
        <ErrorMessage message={trendingMediaError} />
      )}

      {/* Hero section */}
      {!trendingMediaError &&
        !trendingMediaLoading &&
        trendingMedia.length > 0 && (
          <div
            className="w-full h-[calc(100dvh-64px)] grid grid-cols-3 gap-10 relative"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${activeTrendingMedia.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* overlay for readability */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Left: active media details */}
            <div className="relative col-span-3 md:col-span-2 flex flex-col justify-end md:justify-center gap-6 px-10 py-10 md:py-2 z-10">
              {/* title */}
              <div className="flex flex-col gap-1">
                <Badge>TRENDING NOW</Badge>
                <h1 className="text-4xl font-bold text-white">
                  {activeTrendingMedia?.media_type === 'movie'
                    ? activeTrendingMedia.title
                    : activeTrendingMedia?.name}
                </h1>
              </div>

              {/* details row */}
              <div className="flex items-center justify-start flex-wrap gap-4 sm:gap-6">
                {/* rating */}
                <div className="flex items-center gap-2">
                  <FiStar className="size-7 text-primary" />
                  <span className="font-semibold uppercase text-white">
                    {activeTrendingMedia?.vote_average?.toFixed(1) ?? 'N/A'}
                  </span>
                </div>

                {/* type */}
                <div className="flex items-center gap-2">
                  {activeTrendingMedia?.media_type === 'movie' ? (
                    <MdOutlineLocalMovies className="size-7 text-primary" />
                  ) : (
                    <FiTv className="size-7 text-primary" />
                  )}
                  <span className="font-semibold uppercase text-white">
                    {activeTrendingMedia?.media_type}
                  </span>
                </div>

                {/* release/first air date */}
                <div className="flex items-center gap-2">
                  <FiCalendar className="size-7 text-primary" />
                  <span className="font-semibold uppercase text-white">
                    {getYear(
                      activeTrendingMedia.media_type === 'movie'
                        ? activeTrendingMedia?.release_date
                        : activeTrendingMedia?.first_air_date
                    )}
                  </span>
                </div>
              </div>

              {/* overview */}
              <p className="text-neutral-100 leading-relaxed text-justify tracking-wide line-clamp-5">
                {activeTrendingMedia?.overview || 'No overview available.'}
              </p>

              {/* genres */}
              <div className="flex items-center gap-4 flex-wrap">
                {activeTrendingMedia?.genre_ids?.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-black/50 text-white backdrop-blur-2xl rounded-full"
                  >
                    {activeTrendingMedia.media_type === 'movie'
                      ? moviesGenresMap[genre]
                      : tvGenresMap[genre]}
                  </span>
                ))}
              </div>

              {/* actions */}
              <div className="flex items-center gap-6">
                <a
                  href={
                    activeTrendingMedia?.media_type === 'movie'
                      ? `/movies/${activeTrendingMedia?.id}`
                      : `/tv-shows/${activeTrendingMedia?.id}`
                  }
                  className={twMerge(
                    buttonVariants({ size: 'lg' }),
                    'sm:text-base uppercase transition-transform hover:scale-105 duration-300'
                  )}
                >
                  <Play className="size-5" />
                  Details
                </a>

                <Button
                  variant="secondary"
                  size="lg"
                  className="sm:text-base uppercase transition-transform hover:scale-105 duration-300"
                >
                  <Heart className="size-5" />
                  <span className="hidden sm:flex">Add To Favorites</span>
                </Button>
              </div>
            </div>

            {/* Right: next 2 media */}
            <div className="relative hidden md:col-span-1 md:flex md:flex-col md:justify-center gap-6 pr-10 z-10">
              {[1, 2].map((offset) => {
                const item =
                  trendingMedia[
                    (trendingMediaActiveIndex + offset) % trendingMedia.length
                  ];
                return (
                  <div key={item?.id} className="flex items-end">
                    {/* Poster */}
                    <img
                      className="h-48 w-auto rounded-lg rounded-br-none object-cover shadow-md"
                      src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                      alt={item.media_type === 'movie' ? item.title : item.name}
                    />

                    {/* Details */}
                    <div
                      className="h-40 flex-1 rounded-r-lg relative flex flex-col justify-between gap-2 p-3 overflow-hidden shadow-md"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w780${item.backdrop_path})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      {/* overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 rounded-r-lg z-0" />

                      {/* title */}
                      <h3 className="text-white font-semibold text-lg line-clamp-1 z-10">
                        {item.media_type === 'movie' ? item.title : item.name}
                      </h3>

                      {/* overview */}
                      <p className="text-neutral-200 text-sm leading-snug line-clamp-2 z-10">
                        {item.overview}
                      </p>

                      {/* genres */}
                      <div className="flex items-center gap-2 overflow-hidden line-clamp-1 z-10">
                        {item.genre_ids?.map((genre) => (
                          <span
                            key={genre}
                            className="px-2 py-0.5 bg-black/50 text-white text-[11px] backdrop-blur-2xl rounded-full whitespace-nowrap"
                          >
                            {item.media_type === 'movie'
                              ? moviesGenresMap[genre]
                              : tvGenresMap[genre]}
                          </span>
                        ))}
                      </div>

                      {/* actions + date */}
                      <div className="flex items-center gap-4 z-10 mt-auto">
                        <a
                          href={
                            item.media_type === 'movie'
                              ? `/movies/${item.id}`
                              : `/tv-shows/${item.id}`
                          }
                          className="flex items-center text-sm gap-1 text-white hover:text-primary transition-all duration-300"
                        >
                          <FaPlay className="size-4" />
                          Details
                        </a>

                        <div className="flex items-center gap-1 text-white text-sm uppercase">
                          <FiCalendar className="size-4" />
                          <span>
                            {formatDate(
                              item.media_type === 'movie'
                                ? item.release_date
                                : item.first_air_date,
                              'dd/MM/yyyy'
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      <div className="flex flex-col p-6 gap-10">
        {/* popular movies carousel */}
        {/* Loader for popular movies */}
        {popularMoviesLoading && !popularMoviesError && (
          <CarouselSkeleton sectionTitle="Popular Movies" />
        )}

        {/* Error message for popular movies */}
        {!popularMoviesLoading && popularMoviesError && (
          <ErrorMessage message={popularMoviesError} />
        )}

        {!popularMoviesError &&
          !popularMoviesLoading &&
          popularMovies.length > 0 && (
            <MoviesCarousel
              sectionTitle="Popular Movies"
              movies={popularMovies}
              genres={moviesGenresMap}
            />
          )}

        {/* popular tv shows carousel */}
        {/* Loader for popular tv shows */}
        {popularTvShowsLoading && !popularTvShowsError && (
          <CarouselSkeleton sectionTitle="Popular Tv Shows" />
        )}

        {/* Error message for popular tv shows */}
        {!popularTvShowsLoading && popularTvShowsError && (
          <ErrorMessage message={popularTvShowsError} />
        )}

        {!popularTvShowsError &&
          !popularTvShowsLoading &&
          popularTvShows.length > 0 && (
            <TvShowsCarousel
              sectionTitle="Popular TV Shows"
              tvShows={popularTvShows}
              genres={tvGenresMap}
            />
          )}

        {/* now plying movies carousel */}
        {/* Loader for now plying movies */}
        {nowPlayingMoviesLoading && !nowPlayingMoviesError && (
          <CarouselSkeleton sectionTitle="Now Playing" />
        )}

        {/* Error message for now playing movies */}
        {!nowPlayingMoviesLoading && nowPlayingMoviesError && (
          <ErrorMessage message={nowPlayingMoviesError} />
        )}

        {!nowPlayingMoviesError &&
          !nowPlayingMoviesLoading &&
          nowPlayingMovies.length > 0 && (
            <MoviesCarousel
              sectionTitle="Now Playing"
              movies={nowPlayingMovies}
              genres={moviesGenresMap}
            />
          )}

        {/* top rated tv shows carousel */}
        {/* Loader for top rated tv shows */}
        {topRatedTvShowsLoading && !topRatedTvShowsError && (
          <CarouselSkeleton sectionTitle="Top Rated" />
        )}

        {/* Error message for top rated tv shows */}
        {!topRatedTvShowsLoading && topRatedTvShowsError && (
          <ErrorMessage message={topRatedTvShowsError} />
        )}

        {!topRatedTvShowsError &&
          !topRatedTvShowsLoading &&
          topRatedTvShows.length > 0 && (
            <TvShowsCarousel
              sectionTitle="Top Rated"
              tvShows={topRatedTvShows}
              genres={tvGenresMap}
            />
          )}

        {/* upcoming movies carousel */}
        {/* Loader for upcoming movies */}
        {upcomingMoviesLoading && !upcomingMoviesError && (
          <CarouselSkeleton sectionTitle="Upcoming Movies" />
        )}

        {/* Error message for upcoming movies */}
        {!upcomingMoviesLoading && upcomingMoviesError && (
          <ErrorMessage message={upcomingMoviesError} />
        )}

        {!upcomingMoviesError &&
          !upcomingMoviesLoading &&
          upcomingMovies.length > 0 && (
            <MoviesCarousel
              sectionTitle="Upcoming Movies"
              movies={upcomingMovies}
              genres={moviesGenresMap}
            />
          )}
      </div>
      <HomeHeroSkeleton />
    </div>
  );
}
