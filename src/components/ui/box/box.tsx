import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

type BoxProps = {
  children: React.ReactNode;
  className?: string;
};

const boxVariants = cva('border p-2 md:p-4', {
  variants: {
    variant: {
      default: 'border-transparent',
      secondary: 'border-secondary',
    },
    bg: {
      default: 'bg-transparent',
      secondary: 'bg-secondary',
    },
    rounded: {
      default: 'rounded-md',
      none: 'rounded-none',
    },
    size: {
      default: 'border-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    bg: 'default',
    rounded: 'default',
    size: 'default',
  },
});

type BoxVariantProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof boxVariants> &
  BoxProps;

export const Box = ({ children, className, variant }: BoxVariantProps) => {
  return (
    <div className={cn(boxVariants({ className, variant }))}>{children}</div>
  );
};
