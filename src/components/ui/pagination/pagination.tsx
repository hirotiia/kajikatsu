'use client';

import { cva } from 'class-variance-authority';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { cn } from '@/utils/cn';

const navigationButtonVariants = cva(
  'custom-transition grid size-7 place-items-center',
  {
    variants: {
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: 'enabled:hover:text-primary',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);

const pageButtonVariants = cva(
  'custom-opacity-transition grid size-7 place-items-center rounded-sm',
  {
    variants: {
      current: {
        true: 'bg-primary-foreground text-primary',
        false: 'bg-primary text-primary-foreground enabled:hover:opacity-60',
      },
    },
    defaultVariants: {
      current: false,
    },
  },
);

type PaginationProps = {
  total: number; // 全ページ数
  onClick?: (pageNumber: number) => void; // ボタンを押下した時に発火するコールバック
  currentPage?: number; // 現在のページ
  padding?: number; // 現在のページの前後に表示するページ番号のボタンの数
  className?: string;
};

export const Pagination = ({
  total,
  // TODO：仮対応
  onClick = (pageNumber: number) => {
    console.log(pageNumber);
  },
  currentPage = 1,
  padding = 2,
  className,
}: PaginationProps) => {
  if (total <= 1) {
    return null;
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === total;

  // 表示するページ番号の配列を生成
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    const startPage = Math.max(1, currentPage - padding);
    const endPage = Math.min(total, currentPage + padding);

    // 先頭ページのリンク表示
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('...');
      }
    }

    // ページ番号表示
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // 最終ページのリンク表示
    if (endPage < total) {
      if (endPage < total - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(total);
    }

    return pageNumbers;
  };

  return (
    <nav className={cn(className)} aria-label="ページネーション">
      <ul className="flex items-center justify-center gap-3">
        <li>
          <button
            type="button"
            aria-label="最初へ"
            value={1}
            disabled={isFirstPage}
            className={navigationButtonVariants({ disabled: isFirstPage })}
            onClick={() => onClick(1)}
          >
            <ChevronFirst size={28} />
          </button>
        </li>
        <li>
          <button
            type="button"
            aria-label="前へ"
            value={currentPage - 1}
            disabled={isFirstPage}
            className={navigationButtonVariants({ disabled: isFirstPage })}
            onClick={() => onClick(currentPage - 1)}
          >
            <ChevronLeft size={28} />
          </button>
        </li>
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <li key={`ellipsis-${index}`} aria-hidden="true">
                <span>...</span>
              </li>
            );
          }

          const pageNum = page as number;
          const isCurrentPage = pageNum === currentPage;

          return (
            <li key={`page-${pageNum}`}>
              <button
                type="button"
                className={pageButtonVariants({ current: isCurrentPage })}
                disabled={isCurrentPage}
                aria-label={`${pageNum}ページ目`}
                value={pageNum}
                aria-current={isCurrentPage ? 'page' : undefined}
                onClick={() => onClick(pageNum)}
              >
                <span>{pageNum}</span>
              </button>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            aria-label="次へ"
            value={currentPage + 1}
            disabled={isLastPage}
            className={navigationButtonVariants({ disabled: isLastPage })}
            onClick={() => onClick(currentPage + 1)}
          >
            <ChevronRight size={28} />
          </button>
        </li>
        <li>
          <button
            type="button"
            aria-label="最後へ"
            value={total}
            disabled={isLastPage}
            className={navigationButtonVariants({ disabled: isLastPage })}
            onClick={() => onClick(total)}
          >
            <ChevronLast size={28} />
          </button>
        </li>
      </ul>
    </nav>
  );
};
