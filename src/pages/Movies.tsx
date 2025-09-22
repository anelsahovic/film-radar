import MovieCard from '@/components/MovieCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Clapperboard, Flame, PlayCircle, Star } from 'lucide-react';
import { LuSearch } from 'react-icons/lu';

export default function Movies() {
  const filters = [
    { value: 'all', label: 'All Movies', icon: <Clapperboard /> },
    { value: 'now-playing', label: 'Now Playing', icon: <PlayCircle /> },
    { value: 'trending', label: 'Trending', icon: <Flame /> },
    { value: 'top-rated', label: 'Top Rated', icon: <Star /> },
    { value: 'upcoming', label: 'Upcoming', icon: <Calendar /> },
  ];
  return (
    <div className="flex flex-col gap-8 p-4 my-4">
      {/* search */}
      <div className="flex justify-center w-full px-4">
        <div className="relative w-full max-w-lg">
          {/* Search Icon */}
          <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />

          {/* Input */}
          <Input
            placeholder="Search movies..."
            className="
            pl-12 pr-4 h-10 sm:h-11 md:h-12 w-full rounded-full
            bg-background/70  border border-border text-sm sm:text-base md:text-lg
            focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
            transition-all font-semibold duration-300
          "
          />
        </div>
      </div>

      {/* filter of movie - radio group buttons */}
      <div className="w-full flex justify-center">
        <RadioGroup
          defaultValue="all"
          className="flex justify-center flex-wrap items-center gap-8 border-b pb-4 sm:pb-0 border-border"
        >
          {filters.map((filter) => (
            <div key={filter.value} className="relative pb-2">
              {/* Hide the radio but keep it as peer */}
              <RadioGroupItem
                value={filter.value}
                id={filter.value}
                className="peer sr-only"
              />

              {/* Label acts like the button */}
              <Label
                htmlFor={filter.value}
                className="cursor-pointer text-sm sm:text-base font-medium text-muted-foreground transition-colors hover:text-foreground peer-data-[state=checked]:text-primary"
              >
                {filter.icon}
                {filter.label}
              </Label>

              {/* Underline that activates when checked */}
              <div className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary scale-x-0 peer-data-[state=checked]:scale-x-100 transition-transform duration-300 origin-center" />
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* title and selections */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* title */}
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Movies</h2>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:w-fit max-w-lg items-center p-2 gap-2">
          {/* genre selection */}
          <div className="w-full sm:flex sm:justify-end">
            <SelectGroup>
              <SelectLabel>Genre</SelectLabel>
              <Select>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </SelectGroup>
          </div>

          {/* sort by selection */}
          <div className="w-full sm:flex sm:justify-end">
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <Select>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </SelectGroup>
          </div>
        </div>
      </div>

      {/* list of movies */}

      <div className="w-full justify-center grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
}
