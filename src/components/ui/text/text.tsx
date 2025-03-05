import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

type TextProps = {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof textStyles>;
const textStyles = cva('', {
  variants: {
    textSize: {
      sm: 'text-xs md:text-sm',
      md: 'text-sm md:text-base',
      lg: 'text-base md:text-lg',
    },
    spacing: {
      none: 'mt-0',
      sm: 'mt-4',
      md: 'mt-8',
      lg: 'mt-10',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    textSize: 'md',
    spacing: 'sm',
    weight: 'normal',
  },
});
export const Text = ({
  children,
  className,
  textSize,
  spacing,
  weight,
}: TextProps) => {
  return (
    <p className={cn(textStyles({ textSize, spacing, weight }), className)}>
      {children}
    </p>
  );
};
