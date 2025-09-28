import { Skeleton } from './ui/skeleton';

export default function MediaCardSkeleton() {
  return (
    <Skeleton className="w-full h-[320px] rounded-xl relative">
      <Skeleton className="absolute top-2.5 left-2 h-7 w-16 rounded-full bg-background/50 backdrop-blur-2xl" />
      <Skeleton className="absolute top-2 right-2 h-7 w-16 rounded-full bg-background/50 backdrop-blur-2xl" />
      <Skeleton className="absolute bottom-0 left-0 right-0 bg-background/50 backdrop-blur-2xl h-8" />

      <span className="loader-spinner absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></span>
    </Skeleton>
  );
}
