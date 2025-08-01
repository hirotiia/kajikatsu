import React, { InputHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

import { Label } from '../label';

type InputType = InputHTMLAttributes<HTMLInputElement>['type'];

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
  type?: InputType;
  error?: string[];
  className?: string;
  layout?: 'horizontal' | 'vertical';
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  name,
  type = 'text',
  className,
  error = [],
  layout = 'horizontal',
  required,
  ...props
}) => {
  const hasError = error?.length !== 0;

  return (
    <div
      className={cn(
        'grid w-full items-center gap-y-1',
        layout === 'horizontal'
          ? 'md:grid-cols-[200px_1fr] md:gap-x-3'
          : 'grid-cols-1',
      )}
    >
      <label htmlFor={id} className="text-left">
        {label}
        {required ? (
          <Label variant="required" size="sm" className="ml-3 font-bold">
            必須
          </Label>
        ) : (
          <Label size="sm" className="ml-3 font-bold">
            任意
          </Label>
        )}
      </label>
      {error?.map((errMsg, idx) => (
        <p
          key={`${id}-error-${idx}`}
          id={`${id}-error-${idx}`}
          className={cn(
            'text-destructive',
            layout === 'horizontal'
              ? 'md:col-start-2'
              : 'col-start-1 row-start-2',
          )}
          aria-live="polite"
        >
          {errMsg}
        </p>
      ))}
      <div className={cn('', hasError && 'border-destructive')}>
        <input
          id={id}
          name={name}
          type={type}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={cn(
            'block w-full h-12 p-2 text-primary rounded-md border border-muted',
            className,
          )}
          {...props}
        />
      </div>
    </div>
  );
};
