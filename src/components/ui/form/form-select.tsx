import { ChevronDown } from 'lucide-react';
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
  error?: string[];
  options: Option[];
  className?: string;
  layout?: 'horizontal' | 'vertical';
  required?: boolean;
  defaultValue?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  id,
  name,
  label,
  error,
  options,
  className,
  layout = 'horizontal',
  required = false,
  defaultValue,
}) => {
  const hasError = error?.length !== 0;

  return (
    <div
      className={cn(
        'grid w-full items-center gap-1',
        layout === 'horizontal'
          ? 'md:grid-cols-[150px_1fr] md:grid-rows-[auto_auto] md:gap-x-3'
          : 'grid-cols-1 gap-2',
        className,
      )}
    >
      <label htmlFor={id} className="text-left">
        {label}
      </label>
      <div className="group relative">
        <select
          id={id}
          name={name}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          defaultValue={defaultValue}
          className="block h-12 w-full rounded-md border border-muted p-2 text-primary"
          required={required}
        >
          {options.map(({ value, title }) => (
            <option value={value} key={value}>
              {title}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 transition-transform duration-200 group-focus-within:rotate-180"
          aria-hidden="true"
        />
      </div>
      {error?.map((errMsg) => (
        <p
          key={`${id}-error`}
          id={`${id}-error`}
          className={cn(
            'text-destructive',
            layout === 'horizontal'
              ? 'md:col-start-2 md:row-start-2'
              : 'col-start-1 row-start-2',
          )}
          aria-live="polite"
        >
          {errMsg}
        </p>
      ))}
    </div>
  );
};
