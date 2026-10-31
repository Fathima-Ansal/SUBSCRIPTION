import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export const LoadingSpinner = ({ size = 'md', text = 'Loading...', className }) => {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-10 w-10',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-slate-500', className)}>
      <Loader2 className={cn('animate-spin text-blue-600', sizeMap[size])} />
      {text && <p className="mt-2 text-xs font-medium text-slate-500">{text}</p>}
    </div>
  );
};
