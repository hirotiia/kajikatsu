import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Text } from '@/components/ui/text';
import { Task } from '@/types/task.types';
import { cn } from '@/utils/cn';

type Card = Omit<Task, 'createdAt' | 'updatedAt'>;

const cardItemVariants = cva('rounded-lg p-4 shadow-sm transition-colors', {
  variants: {
    background: {
      default: 'bg-background',
      glassmorphism: 'glassmorphism',
    },
  },
  defaultVariants: {
    background: 'default',
  },
});

type CardItemVariants = VariantProps<typeof cardItemVariants>;

type CardsProps = CardItemVariants & {
  items: Card[];
  renderActions?: (item: Card) => React.ReactNode[];
  className?: string;
};

export function Cards({
  items,
  renderActions,
  className,
  background,
}: CardsProps) {
  return (
    <ul className={cn('grid gap-4', className)}>
      {items.map((item) => {
        const { id, title, description, expiresAt, statusName } = item;
        const actionButtons = renderActions?.(item) ?? [];

        return (
          <li
            key={id}
            className={cn(
              'rounded-lg p-4 shadow-sm',
              cardItemVariants({ background }),
            )}
          >
            <Text
              className="text-lg font-semibold text-foreground"
              spacing="none"
            >
              <b>{title}</b>
            </Text>

            {description && (
              <ReactMarkdown className="markdown mt-2">
                {description}
              </ReactMarkdown>
            )}

            <p className="mt-1 text-xs text-destructive">
              期限：{expiresAt ?? '設定なし'}
            </p>

            {statusName && (
              <p className="mt-1 text-xs">ステータス：{statusName}</p>
            )}

            {actionButtons.length > 0 && (
              <div className="mt-3 flex justify-end gap-2">
                {actionButtons.map((btn, index) => (
                  <React.Fragment key={index}>{btn}</React.Fragment>
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
