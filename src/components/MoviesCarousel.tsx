import type { Movie } from '@/types/movies.types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import MovieCard from './MovieCard';

type Props = {
  sectionTitle: string;
  movies: Movie[];
  genres: Record<number, string>;
};

export default function MoviesCarousel({
  sectionTitle,
  movies,
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
            {movies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <MovieCard movie={movie} genres={genres} />
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
