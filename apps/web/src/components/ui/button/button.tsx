import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'focus-visible:ring-ring inline-flex items-start justify-center gap-1 px-1 py-2 text-sm focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 md:text-base',
  {
    variants: {
      variant: {
        default:
          'border-primary bg-primary text-primary-foreground hover:border-primary hover:bg-primary-foreground hover:text-primary border-2 transition-colors delay-200 duration-200 ease-out',
        login:
          'border-foreground bg-background text-foreground hover:border-background hover:bg-foreground hover:text-background border-2 transition-colors delay-200 duration-200 ease-out',
        destructive:
          'border-destructive bg-destructive text-destructive-foreground hover:border-destructive hover:bg-destructive-foreground hover:text-destructive border-2 transition-colors delay-200 duration-200 ease-out',
      },
      size: {
        default: 'min-w-custom',
        full: 'w-full',
        small: 'min-w-24 max-w-40',
        auto: 'w-auto',
      },
      rounded: {
        sm: 'rounded-sm',
        md: 'rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'sm',
    },
  },
);

type ButtonProps<TElementType extends React.ElementType> = Omit<
  React.ComponentPropsWithoutRef<TElementType>,
  'as'
> & {
  as?: TElementType;
  icon?: React.ReactElement;
} & VariantProps<typeof buttonVariants>;

const Button = <TElementType extends React.ElementType>(
  props: ButtonProps<TElementType>,
): React.ReactElement => {
  const { as, icon, children, className, variant, size, rounded, ...rest } =
    props;

  const classes = cn(buttonVariants({ variant, size, rounded }), className);

  if (as === 'a' && 'href' in rest) {
    const { href, ...anchorRest } = rest as React.ComponentPropsWithoutRef<'a'>;

    return (
      <Link href={href as string} {...anchorRest} className={classes}>
        {icon && <span>{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  const Component = (as ?? 'button') as React.ElementType;

  return (
    <Component className={classes} {...rest}>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </Component>
  );
};

export { Button };
