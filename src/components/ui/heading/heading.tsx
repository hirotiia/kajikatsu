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
      h1: 'mb-5 mt-6 md:mb-8 md:mt-16',
      h2: 'mb-4 mt-5 md:mb-7 md:mt-14',
      h3: 'mb-3 mt-4 md:mb-6 md:mt-12',
      h4: 'mb-2 mt-3 md:mb-5 md:mt-10',
      h5: 'my-1 md:my-2',
      h6: 'my-1 md:my-2',
    },
    underline: {
      false: '',
      true: 'relative pb-2 after:absolute after:bottom-0 after:h-[2px] after:w-[50px] after:bg-current after:content-[""] md:pb-3',
    },
    align: {
      left: 'text-left after:left-0 after:-translate-x-0',
      center: 'text-center after:left-1/2 after:-translate-x-1/2',
      right: 'text-right after:right-0 after:translate-x-0',
    },
  },
  defaultVariants: {
    size: 'h2',
    margin: 'h2',
    underline: false,
    align: 'left',
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
  underline,
  align,
}: Props) => {
  return (
    <Tag
      className={cn(
        headingVariants({
          variant,
          size: Tag,
          margin: Tag,
          className,
          underline,
          align,
        }),
      )}
    >
      {children}
    </Tag>
  );
};
