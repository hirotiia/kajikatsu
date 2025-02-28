import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

type BoxProps = {
  children: React.ReactNode;
  className?: string;
};

const boxVariants = cva('border p-2 md:p-4', {
  variants: {
    border: {
      default: 'border-foreground',
      primary: 'border-primary-foreground',
    },
    bg: {
      default: 'bg-background',
      primary: 'bg-primary',
    },
    color: {
      default: 'text-foreground',
      primary: 'text-primary-foreground',
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
    border: 'default',
    bg: 'default',
    color: 'default',
    rounded: 'default',
    size: 'default',
  },
});

type BoxVariantProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof boxVariants> &
  BoxProps;

export const Box = ({ children, className, bg, color }: BoxVariantProps) => {
  return (
    <div
      className={cn(
        '[&>*:first-child]:mt-0',
        boxVariants({ className, bg, color }),
      )}
    >
      {children}
    </div>
  );
};
