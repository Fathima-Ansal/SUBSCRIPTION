import React from 'react';
import { cn } from '../../utils/cn';

export const FormField = ({ label, error, required = false, children, className, helperText }) => {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {helperText && !error && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}
      {error && (
        <p className="text-xs font-medium text-red-600 animate-fadeIn">{error}</p>
      )}
    </div>
  );
};
