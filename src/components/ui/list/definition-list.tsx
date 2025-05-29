import { cva, VariantProps } from 'class-variance-authority';
import { JSX } from 'react';

import { cn } from '@/utils/cn';

// Base styles
const dlStyles = cva('grid gap-y-2');
const itemStyles = cva(
  'grid grid-cols-[85px_1fr] gap-x-1 md:grid-cols-[100px_1fr] md:gap-x-4',
);

// Variant for text size
const textSizeVariants = cva('', {
  variants: {
    textSize: {
      sm: 'text-sm md:text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    textSize: 'sm',
  },
});

export type DefinitionListItem = {
  term: string;
  definitions: (string | JSX.Element)[];
};

export type DefinitionListProps = {
  items: DefinitionListItem[];
  className?: string;
} & VariantProps<typeof textSizeVariants>;

/**
 * DefinitionList コンポーネント
 */
export function DefinitionList({
  items,
  className,
  textSize = 'sm',
}: DefinitionListProps) {
  if (!items?.length) return null;

  return (
    <dl className={cn(dlStyles(), className)}>
      {items.map(({ term, definitions }) => {
        if (!definitions?.length) return null;

        return (
          <div key={term} className={cn(itemStyles())}>
            <dt className={cn('font-semibold', textSizeVariants({ textSize }))}>
              {term}：
            </dt>
            {definitions.map((definition, idx) => (
              <dd
                key={`${term}-${idx}`}
                className={cn(textSizeVariants({ textSize }))}
              >
                {definition}
              </dd>
            ))}
          </div>
        );
      })}
    </dl>
  );
}
