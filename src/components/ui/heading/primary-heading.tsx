import { cn } from '@/utils/cn';

type PrimaryHeading = {
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
};

export const PrimaryHeading = ({
  as: Tag = 'h2',
  children,
  className,
}: PrimaryHeading) => {
  return (
    <hgroup className={cn('mt-24', className)}>
      <Tag className="text-2xl md:text-4xl">{children}</Tag>
    </hgroup>
  );
};
