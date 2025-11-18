import { useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface CompletionMessageProps {
  onComplete: () => void;
}

export function CompletionMessage({ onComplete }: CompletionMessageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="text-center space-y-6 animate-in zoom-in duration-700">
        <div className="flex justify-center">
          <Sparkles className="w-20 h-20 text-green-500 animate-pulse" />
        </div>
        <h1 className="text-5xl font-semibold text-gray-800 tracking-tight">
          Peace Achieved
        </h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Well done. You've completed your meditation session.
        </p>
      </div>
    </div>
  );
}
