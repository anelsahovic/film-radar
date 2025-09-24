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
  type: 'movie' | 'tv';
  sortingValue: string;
  handleSortBy: (sortBy: string) => void;
};

export default function SortBySelection({
  type,
  sortingValue,
  handleSortBy,
}: Props) {
  const movieSelection = [
    { value: 'default', label: 'Default' },
    { value: 'title.asc', label: 'Title (A → Z)' },
    { value: 'title.desc', label: 'Title (Z → A)' },
    { value: 'popularity.asc', label: 'Least Popular' },
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'vote_average.asc', label: 'Lowest Rated' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
  ];

  const tvShowSelection = [
    { value: 'default', label: 'Default' },
    { value: 'name.asc', label: 'Name (A → Z)' },
    { value: 'name.desc', label: 'Name (Z → A)' },
    { value: 'popularity.asc', label: 'Least Popular' },
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'vote_average.asc', label: 'Lowest Rated' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
  ];

  return (
    <SelectGroup>
      <SelectLabel>Sort by</SelectLabel>
      <Select
        defaultValue="default"
        value={sortingValue}
        onValueChange={(value) => handleSortBy(value)}
      >
        <SelectTrigger className="w-full sm:w-[120px]">
          <SelectValue placeholder="Default" />
        </SelectTrigger>
        <SelectContent>
          {type === 'movie' ? (
            movieSelection.map((selection) => (
              <SelectItem key={selection.value} value={selection.value}>
                {selection.label}
              </SelectItem>
            ))
          ) : type === 'tv' ? (
            tvShowSelection.map((selection) => (
              <SelectItem key={selection.value} value={selection.value}>
                {selection.label}
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
