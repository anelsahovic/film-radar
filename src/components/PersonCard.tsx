import type { Person } from '@/types/people.types';
import { Link } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Props = {
  person: Person;
};

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

export default function PersonCard({ person }: Props) {
  return (
    <Link
      to={`/person/${person.id}`}
      className="group flex flex-col justify-between bg-card rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.03] h-96"
    >
      {/* Top Section - Profile */}
      <div className="flex flex-col items-center p-4 gap-3">
        <Avatar className="size-28 shadow-md">
          <AvatarImage
            src={
              person.profile_path
                ? `${IMAGE_BASE_URL}${person.profile_path}`
                : '/images/no_image.png'
            }
            alt={person.name}
            className="object-cover"
          />
          <AvatarFallback>{person.name[0]}</AvatarFallback>
        </Avatar>

        <div className="text-center">
          <h2 className="text-lg font-semibold line-clamp-1">{person.name}</h2>
          <p className="text-sm text-muted-foreground">
            {person.known_for_department || 'Unknown'}
          </p>
        </div>
      </div>

      {/* Bottom Section - Known For */}
      {person.known_for?.length > 0 && (
        <div className="p-4 border-t border-border">
          <p className="text-sm font-medium mb-2">Known For</p>
          <ul className="flex flex-col gap-2">
            {person.known_for.slice(0, 2).map((media) => (
              <li key={media.id} className="flex items-center gap-2">
                {media.poster_path && (
                  <img
                    src={`${IMAGE_BASE_URL}${media.poster_path}`}
                    alt={media.title || media.name}
                    className="w-10 h-14 object-cover rounded"
                  />
                )}
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold truncate">
                    {media.title || media.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {media.media_type.toUpperCase()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Link>
  );
}
