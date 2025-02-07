import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/utils/cn';

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
};

const headingVariants = cva('font-bold', {
  variants: {
    variant: {
      normal: 'border-background text-background',
      primary: 'border-background text-primary-foreground',
    },
    size: {
      h1: 'text-xl md:text-2xl',
      h2: 'text-base md:text-xl',
      h3: 'text-base',
      h4: 'text-sm md:text-base',
      h5: 'text-sm md:text-base',
      h6: 'text-sm md:text-base',
    },
  },
  defaultVariants: {
    size: 'h2',
  },
});

type Props = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> &
  HeadingProps;

export const Heading = ({
  as: Tag = 'h2',
  children,
  className,
  variant,
}: Props) => {
  return (
    <Tag className={cn(headingVariants({ variant, size: Tag, className }))}>
      {children}
    </Tag>
  );
};
