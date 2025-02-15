import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/utils/cn';

const ContentVariant = cva('min-h-[300px] rounded-md', {
  variants: {
    bg: {
      primary: 'bg-primary',
    },
  },
});

type ContentProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof ContentVariant> & {
    children: React.ReactNode;
    className?: string;
  };

export const Content = ({ children, bg, className }: ContentProps) => {
  return (
    <div className={cn(ContentVariant({ bg, className }))}>{children}</div>
  );
};
