import { cva, VariantProps } from 'class-variance-authority';
import React, { JSX } from 'react';

import { cn } from '@/utils/cn';

const dlStyles = cva('grid grid-cols-[auto_1fr] gap-x-4 gap-y-2');

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
 * グリッドレイアウトを使用して用語と定義を整列させる
 * 用語の後にコロンを表示し、定義は複数行に対応
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
          <React.Fragment key={term}>
            <dt className={cn(dtStyles({ textSize }))}>{term}：</dt>
            {definitions.map((definition, idx) => (
              <dd key={`${term}-${idx}`} className={cn(ddStyles({ textSize }))}>
                {definition}
              </dd>
            ))}
          </React.Fragment>
        );
      })}
    </dl>
  );
}
