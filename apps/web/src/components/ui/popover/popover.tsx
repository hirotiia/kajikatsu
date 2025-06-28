'use client';

import { ChevronDown } from 'lucide-react';
import React, { useState, ReactNode, lazy } from 'react';

import { cn } from '@/utils/cn';

const LazyPopoverContent = lazy(() => import('./popover-content'));

type RenderableContent =
  | ReactNode
  | ((props: { close: () => void }) => ReactNode);
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
  containerClassName?: string;
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
  containerClassName,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 開閉トグル
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Popover 内部で閉じるコールバック
  const closePopover = () => setIsOpen(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleToggle}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={cn(
          'flex items-center rounded px-3 py-1 min-w-[140px]',
          className,
        )}
      >
        {children}
        <ChevronDown
          className={cn(
            'ml-2 h-5 w-5 transition-transform duration-300',
            isOpen ? 'rotate-180' : 'rotate-0',
          )}
        />
      </button>

      {isOpen && (
        <LazyPopoverContent
          content={content}
          close={closePopover}
          position={position}
          containerClassName={containerClassName}
        />
      )}
    </div>
  );
}
