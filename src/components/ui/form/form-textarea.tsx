import React, { TextareaHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface FormTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  name: string;
  error?: string;
  className?: string;
  layout?: 'horizontal' | 'vertical';
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  id,
  name,
  error,
  className,
  layout = 'horizontal',
  ...props
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
        <textarea
          id={id}
          name={name}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className="block w-full p-4 text-primary"
          {...props}
        />
      </div>
      {hasError && (
        <p
          className={cn(
            'text-destructive',
            layout === 'horizontal'
              ? 'md:col-start-2 md:row-start-2'
              : 'col-start-1 row-start-2',
          )}
          id={`${id}-error`}
          aria-live="assertive"
        >
          {error}
        </p>
      )}
    </div>
  );
};
