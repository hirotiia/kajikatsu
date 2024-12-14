import React from 'react';

import { cn } from '@/utils/cn';

interface Option {
  value: string;
  title: string;
}

interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  error?: string;
  options: Option[];
  className?: string;
  layout?: 'horizontal' | 'vertical';
}

export const FormSelect: React.FC<FormSelectProps> = ({
  id,
  name,
  label,
  error,
  options,
  className,
  layout = 'horizontal',
}) => {
  const hasError = Boolean(error);

  return (
    <div
      className={cn(
        'grid w-full items-center gap-1',
        layout === 'horizontal'
          ? 'md:grid-cols-[150px_1fr] md:grid-rows-[auto_auto] md:gap-x-3'
          : 'grid-cols-1',
        className,
      )}
    >
      <label htmlFor={id} className="text-left">
        {label}
      </label>
      <div
        className={cn(
          'rounded-md border border-muted text-primary w-full',
          hasError && 'border-destructive',
        )}
      >
        <select
          id={id}
          name={name}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className="block h-12 w-full px-4 text-primary"
          required
        >
          {options.map(({ value, title }) => (
            <option value={value} key={value}>
              {title}
            </option>
          ))}
        </select>
      </div>
      {hasError && (
        <p
          id={`${id}-error`}
          className="text-destructive md:col-start-2 md:row-start-2"
          aria-live="assertive"
        >
          {error}
        </p>
      )}
    </div>
  );
};
