import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

type LabelProps = {
  children: string | React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof labelVariants>;

const labelVariants = cva('inline-block rounded-full', {
  variants: {
    variant: {
      default: 'bg-muted text-foreground',
      required: 'bg-primary text-primary-foreground',
      updated: 'bg-update text-update-foreground',
      deleted: 'bg-destructive text-destructive-foreground',
      created: 'bg-create text-create-foreground',
      warning: 'bg-warning text-warning-foreground',
      completed: 'bg-success text-success-foreground',
      info: 'bg-info text-info-foreground',
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base',
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
      className={cn(labelVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </span>
  );
};
