import { cn } from '@/utils/cn';

type UserInfoSkeletonProps = {
  size?: number;
  className?: string;
  textMaxWidthClass?: string;
};

/**
 * UserInfo 用のスケルトンコンポーネント
 */
export const UserInfoSkeleton = ({
  size = 30,
  className,
  textMaxWidthClass = '',
}: UserInfoSkeletonProps) => {
  return (
    <div className={cn('flex gap-4 items-center animate-pulse', className)}>
      <div
        className="shrink-0 rounded-full bg-muted"
        style={{ width: size, height: size }}
      />
      <div className="flex flex-col gap-1">
        <div className={cn('h-4 w-24 rounded bg-muted', textMaxWidthClass)} />
        <div className={cn('h-3 w-16 rounded bg-muted', textMaxWidthClass)} />
      </div>
    </div>
  );
};
