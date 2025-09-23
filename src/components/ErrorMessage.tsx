import { AlertCircle } from 'lucide-react';

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
      <p className="text-muted-foreground max-w-sm">{message}</p>
    </div>
  );
}
