'use client';

import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, rightElement, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    if (icon) {
      return (
        <div className="flex flex-col gap-1.5">
          {label && (
            <label htmlFor={inputId} className="text-sm text-dark-200">
              {label}
            </label>
          )}
          <div
            className={`flex items-center gap-4 bg-[#1E1E1E] rounded-[36px] px-[22px] py-[22px] focus-within:ring-2 focus-within:ring-gold-focus/60 transition-all ${error ? 'ring-2 ring-danger' : ''}`}
          >
            <span className="shrink-0 flex items-center justify-center w-9 h-9">
              {icon}
            </span>
            <input
              ref={ref}
              id={inputId}
              className={`w-full bg-transparent border-none text-sm text-white placeholder-dark-200/50 focus:outline-none ${className}`}
              {...props}
            />
            {rightElement && (
              <span className="shrink-0 flex items-center justify-center">
                {rightElement}
              </span>
            )}
          </div>
          {error && <span className="text-xs text-danger">{error}</span>}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm text-dark-200">
            {label}
          </label>
        )}
        <div className="relative w-full">
          <input
            ref={ref}
            id={inputId}
            className={`w-full bg-bg border ${error ? 'border-danger' : 'border-dark-400'} rounded-[4px] px-3 py-2.5 text-sm text-white placeholder-dark-200/50 focus:outline-none focus:ring-2 focus:ring-gold-focus/60 focus:border-gold-focus transition-colors pr-10 ${className}`}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-danger">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
