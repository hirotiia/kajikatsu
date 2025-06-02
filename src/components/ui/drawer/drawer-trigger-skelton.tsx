import { cn } from '@/utils/cn';

export const DrawerTriggerSkeleton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted py-2 px-4 w-[120] h-[40] md:w-[128]',
        className,
      )}
    />
  );
};
