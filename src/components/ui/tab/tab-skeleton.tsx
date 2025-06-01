import { cn } from '@/utils/cn';

type TabSkeletonProps = {
  tabCount?: number;
  panelHeight?: number;
  className?: string;
  children?: React.ReactNode;
};

export const TabSkeleton = ({
  tabCount = 3,
  panelHeight,
  className,
  children,
}: TabSkeletonProps) => {
  return (
    <div className={cn('w-full', className)}>
      <ul
        className="flex overflow-hidden rounded-t border-2 border-foreground"
        role="tablist"
        aria-label="読み込み中のタブ"
      >
        {Array.from({ length: tabCount }).map((_, index) => (
          <li
            key={`tab-skeleton-${index}`}
            className="flex-1 border-foreground [&:not(:first-child)]:border-l-2"
            role="presentation"
          >
            <div className="size-full animate-pulse bg-muted px-4 py-2 text-center">
              &nbsp;
            </div>
          </li>
        ))}
      </ul>

      <div
        className="w-full rounded-b border-x-2 border-b-2 border-foreground bg-muted p-2 text-muted-foreground md:p-4"
        style={{ minHeight: panelHeight ?? undefined }}
        aria-hidden="true"
      >
        {children ?? <div className="h-20 animate-pulse rounded bg-muted" />}
      </div>
    </div>
  );
};
