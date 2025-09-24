import type { Genre } from '@/types/movies.types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type Props = {
  genres: Genre[];
  selectedGenre: string;
  setSelectedGenre: (value: string) => void;
  setSelectedFilter?: (value: string) => void;
};

export default function GenreSelection({
  genres,
  selectedGenre,
  setSelectedGenre,
  setSelectedFilter,
}: Props) {
  const handleSelectedGenre = (value: string) => {
    setSelectedGenre(value);
    if (setSelectedFilter) setSelectedFilter('all');
  };
  return (
    <SelectGroup>
      <SelectLabel>Genre</SelectLabel>
      <Select
        defaultValue="default"
        value={selectedGenre}
        onValueChange={(value) => handleSelectedGenre(value)}
      >
        <SelectTrigger className="w-full sm:w-[120px]">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Select</SelectItem>
          {genres ? (
            genres.map((genre) => (
              <SelectItem key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="n/a">N/A</SelectItem>
          )}
        </SelectContent>
      </Select>
    </SelectGroup>
  );
}
