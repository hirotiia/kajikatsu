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
    margin: {
      h1: 'mb-3 mt-4 md:mb-6 md:mt-12',
      h2: 'mb-2 mt-3 md:mb-5 md:mt-10',
      h3: 'mb-2 mt-3 md:mb-4 md:mt-8',
      h4: 'mb-1 mt-2 md:mb-3 md:mt-6',
      h5: 'my-1 md:my-2',
      h6: 'my-1 md:my-2',
    },
  },
  defaultVariants: {
    size: 'h2',
    margin: 'h2',
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
    <Tag
      className={cn(
        headingVariants({ variant, size: Tag, margin: Tag, className }),
      )}
    >
      {children}
    </Tag>
  );
};
