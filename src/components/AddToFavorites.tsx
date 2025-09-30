import type { Media } from '@/types/shared.types';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Movie } from '@/types/movies.types';
import type { TvShow } from '@/types/tv.types';

type Props = {
  media: Media;
  media_type: 'movie' | 'tv';
  hideText?: boolean;
};

export default function AddToFavorites({
  media,
  media_type,
  hideText = false,
}: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites: Media[] =
      JSON.parse(localStorage.getItem('favorites')!) || [];
    setIsFavorite(favorites.some((item) => item.id === media.id));
  }, [media.id]);

  const handleAddToFavorites = () => {
    let favoritesTemp: Media[] =
      JSON.parse(localStorage.getItem('favorites')!) || [];
    if (isFavorite) {
      favoritesTemp = favoritesTemp.filter((item) => item.id !== media.id);
      setIsFavorite(false);
    } else {
      if (media_type === 'movie') {
        favoritesTemp.push({ ...media, media_type: 'movie' } as Movie);
      } else if (media_type === 'tv') {
        favoritesTemp.push({ ...media, media_type: 'tv' } as TvShow);
      }
      setIsFavorite(true);
    }

    localStorage.setItem('favorites', JSON.stringify(favoritesTemp));
  };

  return (
    <Button
      variant="secondary"
      onClick={handleAddToFavorites}
      className="cursor-pointer"
    >
      <Heart
        className={isFavorite ? 'text-red-500 fill-red-500' : 'fill-none'}
      />
      {!hideText && (
        <span className="hidden sm:flex">
          {isFavorite ? 'Remove From Favorites' : 'Add To Favorites'}
        </span>
      )}
    </Button>
  );
}
