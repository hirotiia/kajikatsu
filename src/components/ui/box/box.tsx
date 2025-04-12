import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

type BoxProps = {
  children: React.ReactNode;
  className?: string;
};

const boxVariants = cva('border-2 p-2 md:p-4', {
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
    mt: {
      sm: 'mt-2',
      md: 'mt-3',
      lg: 'mt-4',
      none: 'mt-0',
    },
  },
  defaultVariants: {
    border: 'default',
    bg: 'default',
    color: 'default',
    rounded: 'default',
    mt: 'md',
  },
});

type BoxVariantProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof boxVariants> &
  BoxProps;

export const Box = ({
  children,
  className,
  border,
  bg,
  color,
  rounded,
  mt,
}: BoxVariantProps) => {
  return (
    <div
      className={cn(
        '[&>*:first-child]:mt-0',
        boxVariants({ className, bg, color, border, rounded, mt }),
      )}
    >
      {children}
    </div>
  );
};
