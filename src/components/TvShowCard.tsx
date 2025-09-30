import type { TvShow } from '@/types/tv.types';
import { format, getYear } from 'date-fns';
import { FaStar } from 'react-icons/fa';
import { FiTv } from 'react-icons/fi';
import { Link } from 'react-router';

type Props = {
  tvShow: TvShow;
  genres: Record<number, string>;
};

export default function TvShowCard({ tvShow, genres }: Props) {
  return (
    <Link
      to={`/tv-shows/${tvShow.id}`}
      className="relative block group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-background "
    >
      {/* Poster */}
      <img
        src={
          tvShow.poster_path
            ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
            : '/images/no_poster_placeholder.svg'
        }
        alt={tvShow.name}
        className="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Overlay on hover - tv show details */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <span className="text-sm text-white">TV Show</span>

        <h3 className="text-lg font-bold text-white">{tvShow.name}</h3>
        <p className="text-sm text-gray-300 line-clamp-3">{tvShow.overview}</p>

        <div className="mt-2">
          <span className="text-sm text-white">First air date: </span>
          <span className="font-semibold text-sm text-white">
            {tvShow.first_air_date
              ? format(new Date(tvShow.first_air_date), 'dd/MM/yyyy')
              : 'N/A'}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 flex-wrap">
          {tvShow.genre_ids
            ? tvShow.genre_ids.map((id) => (
                <span
                  key={id}
                  className="font-semibold text-xs text-white px-2 py-1 rounded-full bg-neutral-500/50 backdrop-blur-lg"
                >
                  {genres[id]}
                </span>
              ))
            : tvShow.genres!.map((genre) => (
                <span
                  key={genre.id}
                  className="font-semibold text-xs text-white px-2 py-1 rounded-full bg-neutral-500/50 backdrop-blur-lg"
                >
                  {genres[genre.id]}
                </span>
              ))}
        </div>
      </div>

      {/* top left - TV Show */}
      <div className="absolute top-2.5 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-background/40 backdrop-blur-sm font-medium tracking-wide text-white">
        <FiTv className="size-3 sm:size-4 text-white" />
        <span className="text-xs sm:text-sm">TV Show</span>
      </div>

      {/* top right - rating */}
      <div className="absolute top-2 right-2 flex items-center gap-1 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm font-semibold">
        <FaStar className="size-3 sm:size-4 text-yellow-500" />
        <span className="text-sm sm:text-base">
          {tvShow.vote_average.toFixed(1)}
        </span>
      </div>

      {/* bottom - Info bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-background/30 backdrop-blur-sm px-4 py-2 flex justify-between items-center gap-4 group-hover:opacity-0">
        <span className="text-sm font-semibold truncate text-white">
          {tvShow.name}
        </span>
        <span className="text-white font-extrabold text-sm">
          {tvShow.first_air_date
            ? getYear(new Date(tvShow.first_air_date))
            : 'N/A'}
        </span>
      </div>
    </Link>
  );
}
