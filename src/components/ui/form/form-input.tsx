'use client';

import React, { InputHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

type InputType = InputHTMLAttributes<HTMLInputElement>['type'];

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
  type?: InputType;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  name,
  type = 'text',
  className,
  error,
  ...props
}) => {
  const hasError = Boolean(error);

  return (
    <div className="grid items-center gap-1 md:grid-cols-[150px_1fr] md:grid-rows-[auto_auto] md:gap-x-3">
      <label htmlFor={id} className="text-left">
        {label}
      </label>
      <div className="rounded-md border border-muted text-primary">
        <input
          id={id}
          name={name}
          type={type}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={cn('block w-full h-12 p-4 text-primary', className)}
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
