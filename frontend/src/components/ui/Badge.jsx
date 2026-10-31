import React from 'react';
import { cn } from '../../utils/cn';

export const Badge = ({ className, variant = 'default', children, ...props }) => {
  const variants = {
    default: 'bg-blue-100 text-blue-800 border-blue-200',
    admin: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    staff: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    customer: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    outline: 'text-slate-700 border-slate-300 bg-white',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
