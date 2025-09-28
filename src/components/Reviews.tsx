import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ReviewCard from './ReviewCard';
import type { Review } from '@/types/shared.types';

type Props = {
  reviews: Review[];
};

export default function Reviews({ reviews }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <Badge variant="outline" className="text-xs">
          {reviews.length} total
        </Badge>
      </div>

      {/* Always visible first 2 reviews */}
      {reviews.length === 0 && (
        <div className="italic text-muted-foreground">No reviews yet.</div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {reviews[0] && <ReviewCard review={reviews[0]} />}
        {reviews[1] && <ReviewCard review={reviews[1]} />}
      </div>

      {/* Expandable reviews */}
      <CollapsibleContent className="grid gap-4 sm:grid-cols-2">
        {reviews.slice(2).map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </CollapsibleContent>

      {/* see more/less trigger */}
      {reviews.length > 2 && (
        <CollapsibleTrigger asChild>
          <Button
            variant="link"
            size="sm"
            className="flex items-center gap-1 text-sm text-muted-foreground transition cursor-pointer"
          >
            {isOpen ? (
              <>
                See less <FiChevronUp className="size-4" />
              </>
            ) : (
              <>
                See more <FiChevronDown className="size-4" />
              </>
            )}
          </Button>
        </CollapsibleTrigger>
      )}
    </Collapsible>
  );
}
