import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

type LabelProps = {
  children: string;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof labelVariants>;

const labelVariants = cva('inline-block rounded-md px-2 py-1', {
  variants: {
    variant: {
      default: 'bg-muted text-foreground',
      require: 'bg-primary text-primary-foreground',
      update: 'bg-update text-update-foreground',
      delete: 'bg-destructive text-destructive-foreground',
      create: 'bg-create text-create-foreground',
      warning: 'bg-warning text-warning-foreground',
      success: 'bg-success text-success-foreground',
      info: 'bg-info text-info-foreground',
    },
    size: {
      sm: 'px-1.5 py-0.5 text-sm',
      md: 'px-2 py-1 text-base',
      lg: 'px-3 py-1.5 text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export const Label = ({
  children,
  className,
  variant,
  size,
  ...props
}: LabelProps) => {
  return (
    <span
      className={cn(className, labelVariants({ variant, size }))}
      {...props}
    >
      {children}
    </span>
  );
};
