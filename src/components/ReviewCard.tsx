import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { FaStar } from 'react-icons/fa';

export interface Review {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  url: string;
}

export default function ReviewCard({ review }: { review: Review }) {
  const { author, author_details, content, created_at, url } = review;

  const avatarUrl = author_details.avatar_path
    ? `https://image.tmdb.org/t/p/w200${author_details.avatar_path}`
    : `https://ui-avatars.com/api/?name=${author}&background=random`;

  const rating = author_details.rating;
  const formattedDate = format(new Date(created_at), 'PPP');

  return (
    <div className="rounded-lg border bg-card hover:shadow-md transition flex flex-col p-5">
      {/* Top section - user info & rating*/}
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="size-10 sm:size-12">
            <AvatarImage src={avatarUrl} alt={author} />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-medium text-foreground">
              {author_details.username || author}
            </span>
            <span className="text-xs text-muted-foreground">
              {formattedDate}
            </span>
          </div>
        </div>

        {rating !== null && (
          <div className="flex items-center gap-1">
            <FaStar className="size-4 text-yellow-400" />
            <span className="text-sm font-medium text-foreground">
              {rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Middle content/comment*/}
      <div className="flex flex-col flex-1">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {content}
        </p>
      </div>

      {/* Footer - read more link */}
      <div className="mt-4 flex justify-end">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary hover:underline"
        >
          Read more
        </a>
      </div>
    </div>
  );
}
