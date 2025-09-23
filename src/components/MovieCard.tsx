import type { Movie } from '@/types/movies';

import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router';
import { format, getYear } from 'date-fns';

interface Props {
  movie: Movie;
  genres: Record<number, string>;
}

export default function MovieCard({ movie, genres }: Props) {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-background"
    >
      {/* Poster */}
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/images/no_poster_placeholder.svg'
        }
        alt={movie.title}
        className="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Overlay on hover - movie details*/}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <span className="text-sm text-white">Movie</span>

        <h3 className="text-lg font-bold text-white ">{movie.title}</h3>
        <p className="text-sm text-gray-300 line-clamp-3">{movie.overview}</p>

        <div className="mt-2">
          <span className="text-sm text-white">Release date: </span>
          <span className="font-semibold text-sm text-white">
            {format(movie.release_date, 'dd/MM/yyyy')}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5">
          {movie.genre_ids.map((id) => (
            <span
              key={id}
              className="font-semibold text-xs text-white px-2 py-1 rounded-full bg-neutral-500/50 backdrop-blur-lg"
            >
              {genres[id]}
            </span>
          ))}
        </div>
      </div>

      {/* top right - rating */}
      <div className="absolute top-2 right-2 flex items-center gap-1 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm font-semibold">
        <FaStar className="size-3 sm:size-4 text-yellow-500" />
        <span className="text-sm sm:text-base">
          {movie.vote_average.toFixed(1)}
        </span>
      </div>

      {/* bottom - Info bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-background/30 backdrop-blur-sm px-4 py-2 flex justify-between items-center gap-4 group-hover:opacity-0">
        <span className="text-sm font-semibold truncate text-white">
          {movie.title}
        </span>
        <span className="text-white font-extrabold text-sm">
          {getYear(movie.release_date)}
        </span>
      </div>
    </Link>
  );
}
