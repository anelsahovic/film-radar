import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { Button } from './ui/button';

import { useState } from 'react';
import { FiCalendar, FiChevronDown, FiChevronUp, FiFilm } from 'react-icons/fi';
import { Badge } from './ui/badge';
import { FaStar } from 'react-icons/fa';
import { getYear } from 'date-fns';

interface Season {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

type SeasonsCollapsibleProps = {
  seasons: Season[];
};

export default function SeasonsCollapsible({
  seasons,
}: SeasonsCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!seasons || seasons.length === 0) return null;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">Seasons</h2>
          <Badge variant="secondary" className="text-xs">
            {seasons.length} total
          </Badge>
        </div>
        {seasons.length > 2 && (
          <CollapsibleTrigger asChild>
            <Button
              variant="link"
              size="sm"
              className="flex items-center gap-1 text-sm text-muted-foreground transition cursor-pointer"
            >
              {isOpen ? (
                <>
                  See less <FiChevronUp className="size-4" />
                </>
              ) : (
                <>
                  See more <FiChevronDown className="size-4" />
                </>
              )}
            </Button>
          </CollapsibleTrigger>
        )}
      </div>

      {/* Always visible first 2 seasons */}
      <div className="grid gap-4 sm:grid-cols-2">
        {seasons[0] && <SeasonCard season={seasons[0]} />}
        {seasons[1] && <SeasonCard season={seasons[1]} />}
      </div>

      {/* Expandable seasons */}
      <CollapsibleContent className="grid gap-4 sm:grid-cols-2">
        {seasons.slice(2).map((season) => (
          <SeasonCard key={season.id} season={season} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

type SeasonCardProps = {
  season: Season;
};

function SeasonCard({ season }: SeasonCardProps) {
  const posterImageUrl = season.poster_path
    ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
    : '/images/no_poster_placeholder.svg';

  return (
    <div className="flex border bg-card rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300 w-full max-w-xl">
      {/* Poster */}
      <div className="relative w-28 flex-shrink-0">
        <img
          src={posterImageUrl}
          alt={season.name}
          className="w-28 h-40 object-cover"
        />
        <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-md">
          S{season.season_number}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-3 flex-1">
        <div>
          <h3 className="text-base font-semibold truncate">{season.name}</h3>
          {season.overview && (
            <p className="text-sm line-clamp-2 mt-1">{season.overview}</p>
          )}
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 text-xs mt-2">
          {season.air_date && (
            <span className="flex items-center gap-1">
              <FiCalendar className="w-3 h-3" />
              {season.air_date ? getYear(season.air_date) : 'N/A'}
            </span>
          )}
          <span className="flex items-center gap-1">
            <FiFilm className="w-3 h-3" />
            {season.episode_count} eps
          </span>
          <span className="flex items-center gap-1">
            <FaStar className="w-3 h-3 text-yellow-400" />
            {season.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
