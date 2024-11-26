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
      default: 'text-primary-foreground',
      secondary: 'border-background text-white',
    },
    color: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
    },
    size: {
      h1: 'text-2xl',
      h2: 'text-xl',
      h3: 'text-lg',
      h4: 'text-base',
      h5: 'text-base',
      h6: 'text-base',
    },
  },
  defaultVariants: {
    color: 'default',
    variant: 'default',
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
