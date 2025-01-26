'use client';

import { cva } from 'class-variance-authority';
import React, { useState, useRef, ReactNode } from 'react';

import { cn } from '@/utils/cn';

const popoverContainer = cva(
  'absolute z-50 rounded border bg-white p-3 shadow-md',
  {
    variants: {
      position: {
        top: 'bottom-full mb-2',
        bottom: 'top-full mt-2',
        left: 'right-full mr-2',
        right: 'left-full ml-2',
      },
    },
    defaultVariants: {
      position: 'bottom',
    },
  },
);

// 矢印用
const arrowVariants = cva('absolute size-0 border-8 border-x-transparent', {
  variants: {
    position: {
      top: 'bottom-0 left-1/2 -translate-x-1/2 border-t-white', // 上向き矢印
      bottom: 'left-1/2 top-0 -translate-x-1/2 border-b-white', // 下向き矢印
      left: 'right-0 top-1/2 -translate-y-1/2 border-l-white', // 左向き矢印
      right: 'left-0 top-1/2 -translate-y-1/2 border-r-white', // 右向き矢印
    },
  },
  defaultVariants: {
    position: 'bottom',
  },
});

type PopoverContentProps = {
  /** Popover を閉じるためのコールバック */
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
  /** ボタンなどに適用するクラス */
  className?: string;
};

/**
 * Popoverコンポーネント
 * - ボタンをクリックするとコンテンツをトグル表示
 * - 再度クリックで閉じる
 * - position に応じて矢印の向きが自動的に変化
 * - 外側クリックロジックは削除
 * - コンテンツ内で閉じるボタンを設置したい場合は、content を関数にして `close()` を呼び出す
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

  const renderedContent =
    typeof content === 'function' ? content({ close: closePopover }) : content;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleToggle}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={cn(
          'rounded bg-gray-100 px-3 py-1 hover:bg-gray-200',
          className,
        )}
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
          <div className={arrowVariants({ position })} />
          {renderedContent}
        </div>
      )}
    </div>
  );
}
