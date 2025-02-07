import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/utils/cn';

type SecondaryHeading = {
  children: React.ReactNode;
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

const headingVariants = cva('border-l-4 pl-3', {
  variants: {
    variant: {
      default: 'border-primary text-foreground',
      secondary: 'border-background text-white',
    },
    size: {
      md: 'text-base md:text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> &
  SecondaryHeading;

export const SecondaryHeading = ({
  children,
  variant,
  className,
  as: Tag = 'h2',
}: HeadingProps) => {
  return (
    <hgroup>
      <Tag className={cn(headingVariants({ variant, className }))}>
        {children}
      </Tag>
    </hgroup>
  );
};
