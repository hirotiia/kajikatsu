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
    color: {
      default: 'bg-transparent',
      primary: 'bg-base text-base-foreground',
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
    color: 'default',
    rounded: 'default',
    size: 'default',
  },
});

type BoxVariantProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof boxVariants> &
  BoxProps;

export const Box = ({
  children,
  className,
  variant,
  color,
}: BoxVariantProps) => {
  return (
    <div className={cn(boxVariants({ className, variant, color }))}>
      {children}
    </div>
  );
};
