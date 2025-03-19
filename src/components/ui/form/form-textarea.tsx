'use client';

import React, { TextareaHTMLAttributes, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { Text } from '@/components/ui/text';
import { cn } from '@/utils/cn';

import { Label } from '../label';

interface FormTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  name: string;
  error?: string;
  className?: string;
  layout?: 'horizontal' | 'vertical';
  preview?: boolean;
  defaultValue?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  id,
  name,
  error,
  className,
  layout = 'horizontal',
  preview = false,
  defaultValue = '',
  required = false,
  ...props
}) => {
  const [value, setValue] = useState(defaultValue);
  const hasError = Boolean(error);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    props.onChange?.(e);
  };

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
        {required ? (
          <Label variant="required" size="sm" className="ml-3">
            必須
          </Label>
        ) : (
          <Label variant="warning" size="sm" className="ml-3">
            任意
          </Label>
        )}
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
          className="block w-full rounded-md border border-muted p-2 text-primary"
          onChange={handleChange}
          value={value}
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
      {preview && (
        <>
          <Text>プレビュー</Text>
          <div className="mt-4 rounded-md border border-muted bg-background p-2">
            <ReactMarkdown className="markdown">{value}</ReactMarkdown>
          </div>
        </>
      )}
    </div>
  );
};
