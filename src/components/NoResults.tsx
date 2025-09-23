import { Film, Tv } from 'lucide-react';
import { FaPerson } from 'react-icons/fa6';

type NoResultsProps = {
  type: 'movie' | 'tv' | 'people';
};

export default function NoResults({ type }: NoResultsProps) {
  const { icon, label } = (() => {
    switch (type) {
      case 'tv':
        return { icon: <Tv size={48} />, label: 'TV Shows' };
      case 'people':
        return { icon: <FaPerson size={48} />, label: 'People' };
      case 'movie':
      default:
        return { icon: <Film size={48} />, label: 'Movies' };
    }
  })();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Icon */}
      <div className="bg-muted text-primary rounded-full p-6 mb-6 shadow-lg">
        {icon}
      </div>

      {/* Main message */}
      <h2 className="text-2xl font-bold text-foreground mb-2">
        No {label} Found
      </h2>

      {/* Subtext */}
      <p className="text-muted-foreground max-w-sm">
        We couldn't find any {label.toLowerCase()} that match your search or
        filter criteria. Try adjusting your filters or searching for something
        else.
      </p>
    </div>
  );
}
