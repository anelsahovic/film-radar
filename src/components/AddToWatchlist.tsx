import type { Media } from '@/types/shared.types';
import { Button } from './ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Movie } from '@/types/movies.types';
import type { TvShow } from '@/types/tv.types';

type Props = {
  media: Media;
  media_type: 'movie' | 'tv';
  hideText?: boolean;
};

export default function AddToWatchlist({
  media,
  media_type,
  hideText = false,
}: Props) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const watchlist: Media[] =
      JSON.parse(localStorage.getItem('watchlist')!) || [];
    setIsInWatchlist(watchlist.some((item) => item.id === media.id));
  }, [media.id]);

  const handleAddToWatchlist = () => {
    let watchlistTemp: Media[] =
      JSON.parse(localStorage.getItem('watchlist')!) || [];
    if (isInWatchlist) {
      watchlistTemp = watchlistTemp.filter((item) => item.id !== media.id);
      setIsInWatchlist(false);
    } else {
      if (media_type === 'movie') {
        watchlistTemp.push({ ...media, media_type: 'movie' } as Movie);
      } else if (media_type === 'tv') {
        watchlistTemp.push({ ...media, media_type: 'tv' } as TvShow);
      }
      setIsInWatchlist(true);
    }

    localStorage.setItem('watchlist', JSON.stringify(watchlistTemp));
  };
  return (
    <Button
      variant="secondary"
      onClick={handleAddToWatchlist}
      className="cursor-pointer"
    >
      {isInWatchlist ? <EyeOff className="text-primary" /> : <Eye />}

      {!hideText && (
        <span className="hidden sm:flex">
          {isInWatchlist ? 'Remove From Watchlist' : 'Add To Watchlist'}
        </span>
      )}
    </Button>
  );
}
