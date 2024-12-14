'use client';

import React, { TextareaHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface FormTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  name: string;
  error?: string;
  className?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  id,
  name,
  error,
  className,
  ...props
}) => {
  const hasError = Boolean(error);

  return (
    <div className="grid items-center gap-1 md:grid-cols-[150px_1fr] md:grid-rows-[auto_auto] md:gap-x-3">
      <label htmlFor={id} className="text-left">
        {label}
      </label>
      <div className="rounded-md border border-muted text-primary">
        <textarea
          id={id}
          name={name}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={cn('block w-full p-4 text-primary', className)}
          {...props}
        />
      </div>
      {hasError && (
        <p
          className="text-destructive md:col-start-2 md:row-start-2"
          id={`${id}-error`}
          aria-live="assertive"
        >
          {error}
        </p>
      )}
    </div>
  );
};
