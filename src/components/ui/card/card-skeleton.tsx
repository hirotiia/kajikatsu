import React from 'react';

import { cn } from '@/utils/cn';

type CardSkeletonProps = {
  count?: number;
  className?: string;
};

export function CardSkeleton({ count = 3, className }: CardSkeletonProps) {
  return (
    <ul className={cn('grid gap-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className="min-h-[120px] animate-pulse rounded-lg bg-primary p-4 shadow-sm"
        >
          <div className="mb-3 h-4 w-1/2 rounded bg-muted" />
          <div className="mb-2 h-3 w-3/4 rounded bg-muted" />
          <div className="mb-2 h-3 w-2/3 rounded bg-muted" />
          <div className="h-3 w-1/4 rounded bg-muted" />
        </li>
      ))}
    </ul>
  );
}
