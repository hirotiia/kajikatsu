import { InputHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

type InputType = InputHTMLAttributes<HTMLInputElement>['type'];

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  name: string;
  type?: InputType;
  className?: string;
  error?: string;
};

export const FormInput = ({
  label,
  id,
  name,
  type = 'text',
  className,
  error,
  ...props
}: FormInputProps) => (
  <div className="grid items-center gap-1 md:grid-cols-[150px_1fr] md:grid-rows-[auto_auto] md:gap-x-3">
    <label htmlFor={id}>{label}</label>
    <div className="rounded-md border border-muted text-primary">
      <input
        id={id}
        name={name}
        type={type}
        aria-invalid="false"
        aria-describedby={`${id}-error`}
        className={cn('block size-full h-[48px] p-4 text-primary', className)}
        {...props}
      />
    </div>
    {error && (
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

export default FormInput;
