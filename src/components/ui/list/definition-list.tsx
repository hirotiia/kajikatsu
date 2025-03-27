import { cva, VariantProps } from 'class-variance-authority';
import React, { JSX } from 'react';

import { cn } from '@/utils/cn';

const dlStyles = cva('grid gap-y-4');

const itemStyles = cva(
  'grid grid-cols-[85px_1fr] gap-x-1 md:grid-cols-[100px_1fr] md:gap-x-4',
);

const dtStyles = cva('font-semibold', {
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

const ddContainerStyles = cva('grid grid-cols-subgrid gap-y-2');

const ddStyles = cva('', {
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

type TextSizeVariant = VariantProps<typeof dtStyles>['textSize'];

export type DefinitionListProps = {
  items: DefinitionListItem[];
  className?: string;
  textSize?: TextSizeVariant;
};

/**
 * DefinitionList コンポーネント
 *
 * 各項目が横並びになり、複数の定義がある場合は縦に積み重なる
 * dtとddは横並びで、複数のddは縦積みになる
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
            <dt className={cn(dtStyles({ textSize }))}>{term}：</dt>

            <div className={cn(ddContainerStyles())}>
              {definitions.map((definition, idx) => (
                <dd
                  key={`${term}-${idx}`}
                  className={cn(ddStyles({ textSize }))}
                >
                  {definition}
                </dd>
              ))}
            </div>
          </div>
        );
      })}
    </dl>
  );
}
