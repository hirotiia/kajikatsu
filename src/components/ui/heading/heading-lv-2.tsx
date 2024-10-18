import { cn } from '@/utils/cn';

type HeadingLv2 = {
  children: React.ReactNode;
  className?: string;
};

export const HeadingLv2 = ({ children, className }: HeadingLv2) => {
  return (
    <hgroup className={cn('mt-24', className)}>
      <h2 className="text-2xl md:text-4xl">{children}</h2>
    </hgroup>
  );
};
