import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/utils/cn';

const ContentVariant = cva('min-h-dvh rounded-md', {
  variants: {
    bg: {
      default: 'bg-transparent',
      secondary: 'bg-secondary',
    },
  },
  defaultVariants: {
    bg: 'default',
  },
});

type ContentProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof ContentVariant> & {
    children: React.ReactNode;
    className?: string;
  };

export const Content = ({ children, bg, className }: ContentProps) => {
  return (
    <div className={cn('p-4', ContentVariant({ bg, className }))}>
      {children}
    </div>
  );
};
