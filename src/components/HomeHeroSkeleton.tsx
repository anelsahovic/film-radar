import { Skeleton } from './ui/skeleton';

export default function HomeHeroSkeleton() {
  return (
    <div className="w-full h-[calc(100dvh-64px)] grid grid-cols-3 gap-10 relative">
      <Skeleton className="w-full h-full absolute inset-0 bg-accent/45" />

      {/* left */}
      <div className="relative col-span-3 md:col-span-2 flex flex-col justify-end md:justify-center gap-6 px-10 py-10 md:py-2 z-10">
        {/* title */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-8 w-32 rounded-full" />
        </div>

        {/* details row */}
        <div className="flex items-center justify-start flex-wrap gap-4 sm:gap-6">
          {/* rating */}
          <div className="flex items-center gap-2">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-3 w-12" />
          </div>

          {/* type */}
          <div className="flex items-center gap-2">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-3 w-12" />
          </div>

          {/* release/first air date */}
          <div className="flex items-center gap-2">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        {/* overview */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-[400px]" />
          <Skeleton className="h-3 w-[400px]" />
          <Skeleton className="h-3 w-[400px]" />
        </div>

        {/* genres */}
        <div className="flex items-center gap-4 flex-wrap">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>

        {/* action */}
        <div className="flex items-center gap-6">
          <Skeleton className="h-10 w-32 " />
          <Skeleton className="h-10 w-44 " />
        </div>
      </div>

      {/* right */}
      <div className="relative hidden md:col-span-1 md:flex md:flex-col md:justify-center gap-6 pr-10 z-10">
        <div className="flex items-end">
          <Skeleton className="h-48 w-32 rounded-lg rounded-br-none" />
          <div className="h-40 flex-1 relative ">
            <Skeleton className="absolute w-full h-full rounded-none rounded-r-lg" />
            <div className="w-full h-full p-3 flex flex-col justify-between gap-2 overflow-hidden">
              <Skeleton className="h-6 w-20 rounded-full" />

              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-[200px]" />
                <Skeleton className="h-3 w-[200px]" />
              </div>

              <div className="flex items-center gap-2 overflow-hidden ">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-14" />
              </div>

              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-end">
          <Skeleton className="h-48 w-32 rounded-lg rounded-br-none" />
          <div className="h-40 flex-1 relative ">
            <Skeleton className="absolute w-full h-full rounded-none rounded-r-lg" />
            <div className="w-full h-full p-3 flex flex-col justify-between gap-2 overflow-hidden">
              <Skeleton className="h-6 w-20 rounded-full" />

              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-[200px]" />
                <Skeleton className="h-3 w-[200px]" />
              </div>

              <div className="flex items-center gap-2 overflow-hidden ">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-14" />
              </div>

              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
