'use client';

import { cva } from 'class-variance-authority';
import React, { useState, useRef, ReactNode } from 'react';

import { cn } from '@/utils/cn';

const popoverContainer = cva(
  [
    'absolute z-50 rounded border bg-white shadow-md',
    "before:absolute before:border-8 before:border-x-transparent before:content-['']",
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

type PopoverContentProps = {
  close: () => void;
};

type RenderableContent =
  | ReactNode
  | ((props: PopoverContentProps) => ReactNode);

type Positions = 'top' | 'bottom' | 'left' | 'right';

type PopoverProps = {
  /** トリガーボタンの中身 */
  children: ReactNode;
  /** ポップオーバー内に表示するコンテンツ（またはコンテンツを返す関数） */
  content: RenderableContent;
  /** 位置 (top / bottom / left / right) */
  position?: Positions;
  /** トリガーボタンに適用するクラス */
  className?: string;
};

/**
 * Popoverコンポーネント
 * - 親要素に `relative inline-block` を付与し、ポップオーバーは `absolute` で配置
 * - 擬似要素 (before) で矢印を表現
 * - position により自動的に矢印の向きが変わる
 * - 外側クリックで閉じるロジックは削除
 * - コンテンツ内で「閉じる」ボタンを設置したい場合は、content を関数にして `close()` を呼び出す
 */
export function Popover({
  children,
  content,
  position = 'bottom',
  className,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // 開閉トグル
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Popover 内部で閉じるコールバック
  const closePopover = () => setIsOpen(false);

  // Render Props の場合は close 関数を注入
  const renderedContent =
    typeof content === 'function' ? content({ close: closePopover }) : content;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleToggle}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={cn('rounded px-3 py-1 hover:bg-gray-200', className)}
      >
        {children}
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-modal="false"
          className={popoverContainer({ position })}
        >
          {renderedContent}
        </div>
      )}
    </div>
  );
}
