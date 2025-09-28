import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import MediaCardSkeleton from './MediaCardSkeleton';

interface Props {
  sectionTitle: string;
}
export default function CarouselSkeleton({ sectionTitle }: Props) {
  return (
    <section className="flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle}</h2>

      <div className="relative">
        <Carousel className="w-full overflow-hidden">
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <MediaCardSkeleton />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
