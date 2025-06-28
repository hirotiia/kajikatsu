'use client';

import { cva } from 'class-variance-authority';
import React, { useRef, ReactNode } from 'react';

import { cn } from '@/utils/cn';

const popoverContainer = cva(
  [
    'absolute z-50 rounded bg-white shadow-md',
    "before:absolute before:border-8 before:border-transparent before:content-['']",
  ],
  {
    variants: {
      position: {
        top: [
          'bottom-full mb-2',
          'before:left-1/2 before:top-full before:-translate-x-1/2 before:border-t-white',
        ],
        bottom: [
          'top-full mt-2',
          'before:bottom-full before:left-1/2 before:-translate-x-1/2 before:border-b-white',
        ],
        left: [
          'right-full mr-2',
          'before:left-full before:top-1/2 before:-translate-y-1/2 before:border-l-white',
        ],
        right: [
          'left-full ml-2',
          'before:right-full before:top-1/2 before:-translate-y-1/2 before:border-r-white',
        ],
      },
    },
    defaultVariants: {
      position: 'bottom',
    },
  },
);

type RenderableContent =
  | ReactNode
  | ((props: { close: () => void }) => ReactNode);
type Positions = 'top' | 'bottom' | 'left' | 'right';

type PopoverContentProps = {
  content: RenderableContent;
  close: () => void;
  position: Positions;
  containerClassName?: string;
};

export default function PopoverContent({
  content,
  close,
  position,
  containerClassName,
}: PopoverContentProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  // Render Props の場合は close 関数を注入
  const renderedContent =
    typeof content === 'function' ? content({ close }) : content;

  return (
    <div
      ref={popoverRef}
      role="dialog"
      aria-modal="false"
      className={cn(popoverContainer({ position }), containerClassName)}
    >
      {renderedContent}
    </div>
  );
}
