import { AlertCircle } from 'lucide-react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { buttonVariants } from './ui/button';

type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Icon */}
      <div className="bg-destructive text-destructive-foreground rounded-full p-6 mb-6 shadow-lg ">
        <AlertCircle size={38} />
      </div>

      {/* Main message */}
      <h2 className="text-2xl font-bold text-destructive mb-2">
        Oops! Something went wrong
      </h2>

      {/* Subtext */}
      <p className="text-muted-foreground max-w-sm mb-4">{message}</p>

      <Link
        to="/"
        className={twMerge(
          'flex items-center justify-center gap-2',
          buttonVariants({ variant: 'secondary' })
        )}
      >
        <FaHome className="size-5" />
        <span>Go Home</span>
      </Link>
    </div>
  );
}
