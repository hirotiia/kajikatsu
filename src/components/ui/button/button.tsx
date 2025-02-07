import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/utils/cn';
import { invertOnHover } from '@/utils/invert-on-hover';

const buttonVariants = cva(
  'inline-flex items-center justify-center px-4 py-3 text-sm focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:text-base',
  {
    variants: {
      variant: {
        default: cn(
          'border-primary-foreground',
          invertOnHover('bg-primary', 'text-primary-foreground'),
        ),
        login: cn(
          'border-base-foreground',
          invertOnHover('bg-base', 'text-base-foreground'),
        ),
        destructive: cn(
          'border-destructive-foreground',
          invertOnHover('bg-destructive', 'text-destructive-foreground'),
        ),
      },
      size: {
        default: 'min-w-custom',
        full: 'w-full',
        small: 'min-w-24 p-2',
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

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof buttonVariants> & {
    as?: 'button' | 'a' | 'div';
    icon?: React.ReactNode;
    children: React.ReactNode;
    href?: string;
  };

const Button = ({
  as: Component = 'button',
  icon,
  children,
  variant,
  size,
  rounded,
  className,
  href,
  ...props
}: ButtonProps) => {
  const buttonVariantsProps = { variant, size, rounded, className };

  const content = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
    </>
  );

  return Component === 'a' && href ? (
    <Link
      className={cn(buttonVariants(buttonVariantsProps))}
      href={href}
      {...props}
    >
      {content}
    </Link>
  ) : (
    <Component className={cn(buttonVariants(buttonVariantsProps))} {...props}>
      {content}
    </Component>
  );
};

export { Button };
