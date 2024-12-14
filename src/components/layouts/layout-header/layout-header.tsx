import Image from 'next/image';
import Link from 'next/link';

import { config } from '@/config/config';
import { cn } from '@/utils/cn';

interface HeaderProps {
  className?: string;
}

const Logo = () => {
  return (
    <Link className="flex items-center gap-3" href="/">
      <Image
        className="h-10 w-auto md:h-12"
        alt="チャートレアイコン"
        src="/images/logo.svg"
        width="80"
        height="80"
      />
      <span>{config.APP_NAME}</span>
    </Link>
  );
};

export const LayoutHeader = async ({ className }: HeaderProps) => {
  return (
    <header
      className={cn(
        'sticky top-6 mt-6 flex items-center justify-between p-4 glassmorphism z-49',
        className,
      )}
    >
      <Logo />
    </header>
  );
};
