'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const SEGMENT_LABEL_MAP: Record<string, string> = {
  dashboard: 'ホーム',
  todos: 'おしごと',
  group: 'グループ',
  history: '履歴',
  settings: '設定',
  information: 'おしらせ',
};

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter((seg) => seg.length > 0);

  if (segments.length < 2) {
    return null;
  }

  const getLabel = (segment: string, index: number) => {
    if (SEGMENT_LABEL_MAP[segment]) {
      return SEGMENT_LABEL_MAP[segment];
    }
    // 最初のセグメントが "history" の場合、
    // 2つ目以降（index >= 1）はすべて "履歴詳細" に変換
    if (segments[0] === 'history' && index >= 1) {
      return '履歴詳細';
    }

    return segment;
  };

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center">
        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          const isCurrentPage = index === segments.length - 1;
          const label = getLabel(segment, index);

          return (
            <li key={href} className="flex items-center">
              {index !== 0 && (
                <ChevronRight size={15} className="mx-1 inline-block" />
              )}
              {isCurrentPage ? (
                <span>
                  <b>{label}</b>
                </span>
              ) : (
                <Link
                  href={href}
                  className="custom-transition hover:text-primary"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
