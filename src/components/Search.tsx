import { LuSearch } from 'react-icons/lu';
import { Input } from './ui/input';
import { useState } from 'react';
import { useDebounce } from 'react-use';
import { MdMovie, MdTv, MdPerson } from 'react-icons/md';

type Props = {
  searchQuery: string;
  handleSearchQuery: (query: string) => void;
  type: 'movies' | 'tv' | 'people';
};
export default function Search({
  searchQuery,
  handleSearchQuery,
  type,
}: Props) {
  const [inputValue, setInputValue] = useState(searchQuery);

  // debounce the search to prevent making too many api requests
  useDebounce(
    () => {
      handleSearchQuery(inputValue);
    },
    500,
    [inputValue]
  );

  const placeholderMap = {
    movies: 'Search movies...',
    tv: 'Search TV shows...',
    people: 'Search people...',
  };

  const iconMap = {
    movies: <MdMovie className="h-5 w-5 text-muted-foreground" />,
    tv: <MdTv className="h-5 w-5 text-muted-foreground" />,
    people: <MdPerson className="h-5 w-5 text-muted-foreground" />,
  };
  return (
    <div className="relative w-full max-w-lg">
      {/* Dynamic Icon */}
      <span className="absolute left-4 top-1/2 -translate-y-1/2">
        {iconMap[type] || (
          <LuSearch className="h-5 w-5 text-muted-foreground" />
        )}
      </span>
      <Input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        placeholder={placeholderMap[type]}
        className="
          pl-12 pr-4 h-10 sm:h-11 md:h-12 w-full rounded-full
          bg-background/70 border border-border text-sm sm:text-base md:text-lg
          focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
          transition-all font-semibold duration-300
        "
      />
    </div>
  );
}
