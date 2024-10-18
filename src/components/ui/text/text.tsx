import { cn } from '@/utils/cn';

type Text = {
  children: React.ReactNode;
  className?: string;
};

export const Text = ({ children, className }: Text) => {
  return <p className={cn('mt-10 pl-4 md:text-lg', className)}>{children}</p>;
};
