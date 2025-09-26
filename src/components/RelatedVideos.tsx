import type { Video } from '@/types/movies.types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { FaYoutube } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

type Props = {
  videos: Video[];
};

export default function RelatedVideos({ videos }: Props) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Related Videos</h2>

      <div className="relative">
        <Carousel className="w-full overflow-hidden">
          <CarouselContent>
            {videos.map((video) => (
              <CarouselItem
                key={video.id}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <a
                  href={`https://www.youtube.com/watch?v=${video.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-xl bg-muted shadow hover:shadow-lg transition"
                >
                  {/* Thumbnail */}
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                    alt={video.name}
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40" />
                  <FaYoutube className="absolute left-1/2 -translate-x-1/2 top-20 size-12 z-20 text-red-500 drop-shadow-lg group-hover:text-red-700 transition-all duration-300" />
                  <div className="absolute left-1/2 -translate-x-1/2 top-24 size-4 bg-neutral-100" />

                  {/* Info */}
                  <div className="p-3 flex flex-col gap-2">
                    {/* Title */}
                    <h3 className="text-sm font-semibold text-foreground line-clamp-1">
                      {video.name}
                    </h3>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="rounded-md bg-muted">{video.type}</span>
                      <span>{video.size}p</span>
                      <span>{formatDistanceToNow(video.published_at)}</span>
                      {video.official && (
                        <span className="text-primary font-medium">
                          Official
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Modern buttons */}
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-black/40 text-white shadow-md backdrop-blur-sm hover:bg-black/60 hover:text-primary hover:ring-2 hover:ring-primary hover:scale-105 transition-all duration-300" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-black/40 text-white shadow-md backdrop-blur-sm hover:bg-black/60 hover:text-primary hover:ring-2 hover:ring-primary hover:scale-105 transition-all duration-300" />
        </Carousel>
      </div>
    </section>
  );
}
