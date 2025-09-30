import MovieCard from '@/components/MovieCard';
import TvShowCard from '@/components/TvShowCard';
import { Button } from '@/components/ui/button';
import { getMovieGenres } from '@/services/movies.service';
import { getTvShowGenres } from '@/services/tv.service';
import type { Movie } from '@/types/movies.types';
import type { Genre, Media } from '@/types/shared.types';
import type { TvShow } from '@/types/tv.types';
import { Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Favorites() {
  const [favorites, setFavorites] = useState<Media[]>([]);
  const [moviesGenresMap, setMoviesGenresMap] = useState<
    Record<number, string>
  >({});
  const [tvGenresMap, setTvGenresMap] = useState<Record<number, string>>({});

  // get favorites
  useEffect(() => {
    const favoritesTemp: Media[] =
      JSON.parse(localStorage.getItem('favorites')!) || [];

    setFavorites(favoritesTemp);
  }, []);

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

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  return (
    <div className="h-full w-full flex flex-col p-4 py-10 gap-6">
      <title>
        Favorites - Film Radar - Discover movies, TV shows, and people.
      </title>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* title */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Favorites
          </h2>
          <h2 className="text-base sm:text-lg md:text-xl text-muted-foreground text-center">
            Movies and TV Shows you marked as favorite
          </h2>
        </div>

        {/* clear all  */}
        <Button
          onClick={clearFavorites}
          variant="outline"
          className="cursor-pointer"
        >
          <Trash /> Clear All
        </Button>
      </div>

      {/* Media cards */}

      {favorites.length > 0 ? (
        <div className="w-full justify-center grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] place-items-center">
          {favorites.map((favorite) =>
            favorite?.media_type === 'movie' ? (
              <MovieCard
                key={favorite.id}
                movie={favorite as Movie}
                genres={moviesGenresMap}
              />
            ) : (
              <TvShowCard
                key={favorite.id}
                tvShow={favorite as TvShow}
                genres={tvGenresMap}
              />
            )
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center italic text-muted-foreground">
          You didn't save any movies or tv shows
        </div>
      )}
    </div>
  );
}
