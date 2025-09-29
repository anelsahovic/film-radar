import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import type { TvShow } from '@/types/tv.types';
import TvShowCard from './TvShowCard';

type Props = {
  sectionTitle: string;
  tvShows: TvShow[];
  genres: Record<number, string>;
};

export default function TvShowsCarousel({
  sectionTitle,
  tvShows,
  genres,
}: Props) {
  return (
    <section className="flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle}</h2>

      <div className="relative">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full overflow-hidden"
        >
          <CarouselContent>
            {tvShows.map((tvShow) => (
              <CarouselItem key={tvShow.id} className="max-w-[250px]">
                <TvShowCard tvShow={tvShow} genres={genres} />
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
