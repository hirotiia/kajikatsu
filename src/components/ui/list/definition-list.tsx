'use client';

import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/utils/cn';

/*
  cva を用いてデフォルトのスタイルを定義
  - 必要に応じて variant で大きさ/色/余白などを切り替え可能
*/
const dlStyles = cva('mb-4', {
  variants: {
    spacing: {
      sm: 'space-y-2',
      md: 'space-y-4',
      lg: 'space-y-6',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

/**
 * dt / dd のテキストサイズを variant で制御
 */
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

const ddStyles = cva('ml-4', {
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
  /** 見出し(用語) */
  term: React.ReactNode;
  /** 定義部 */
  definition: React.ReactNode;
};

type DLVariants = VariantProps<typeof dlStyles>;
type DTVariants = VariantProps<typeof dtStyles>;

export type DefinitionListProps = {
  /** 定義リストの項目配列 */
  items: DefinitionListItem[];
  className?: string;
  spacing?: DLVariants['spacing'];
  textSize?: DTVariants['textSize'];
};

/**
 *
 * DefinitionList コンポーネント
 *
 * - <dl> 直下に items.map() で <dt>/<dd> ペアを展開
 * - definition には自由に ReactNode を渡せるため、再帰的に入れ子もOK
 * - cva で styling
 */
export function DefinitionList({
  items,
  className,
  spacing = 'md',
  textSize = 'sm',
}: DefinitionListProps) {
  return (
    <dl className={cn(dlStyles({ spacing }), className)}>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <dt className={cn(dtStyles({ textSize }))}>{item.term}</dt>
          <dd className={cn(ddStyles({ textSize }))}>{item.definition}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
