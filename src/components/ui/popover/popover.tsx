'use client';

import React, {
  useState,
  useRef,
  ReactNode,
  MouseEvent as ReactMouseEvent,
} from 'react';

type PopoverContentProps = {
  close: () => void;
};

type RenderableContent =
  | ReactNode
  | ((props: PopoverContentProps) => ReactNode);

type PopoverProps = {
  children: ReactNode;
  content: RenderableContent;
  position?: 'top' | 'bottom' | 'left' | 'right';
};

/**
 * シンプルなPopoverコンポーネント
 * - ボタンをクリックするとコンテンツをトグル表示
 * - 再度クリックで閉じる
 * - コンテンツ外クリックで閉じる
 * - コンテンツ内から「閉じる」ためのボタンを設置したい場合は、content を Render Props にする
 */
export function Popover({
  children,
  content,
  position = 'bottom',
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  /**
   * トリガーをクリックした時に開閉をトグル
   */
  const handleToggle = (e: ReactMouseEvent<HTMLButtonElement>) => {
    // stopPropagation で親(onClickCapture)にイベントが伝搬しないようにする
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  /**
   * 親要素の onClickCapture で「外側クリック」を検出
   */
  const handleClickOutsideCapture = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!isOpen) return;
    if (!popoverRef.current) return;
    if (popoverRef.current.contains(e.target as Node)) {
      return;
    }

    setIsOpen(false);
  };

  /**
   * コンテンツ用の「閉じるコールバック」
   */
  const closePopover = () => setIsOpen(false);

  /**
   * content が「関数」なら、close関数を渡して実行する
   * そうでなければ単純に ReactNode を返す
   */
  const renderedContent =
    typeof content === 'function'
      ? content({ close: closePopover }) // render props
      : content;

  // 表示位置に応じたクラス
  // - 吹き出しの矢印を下側に表示する例を bottom に追加
  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  return (
    <div
      className="relative inline-block"
      onClickCapture={handleClickOutsideCapture}
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="rounded bg-gray-100 px-3 py-1 hover:bg-gray-200"
      >
        {children}
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-modal="false"
          className={`absolute z-50 rounded border bg-white p-3 shadow-md
            ${positionClasses[position]}
            relative
          `}
        >
          {position === 'bottom' && (
            <div
              className="
                absolute
                -top-2 left-1/2
                size-0 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent
                border-b-white
              "
            />
          )}

          {renderedContent}
        </div>
      )}
    </div>
  );
}
