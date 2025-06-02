import { cn } from '@/utils/cn';

export const DrawerTriggerSkeleton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted py-2 px-4 w-[120px] h-[40px] md:w-[128px]',
        className,
      )}
    />
  );
};
