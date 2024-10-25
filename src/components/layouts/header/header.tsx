import Image from 'next/image';
import Link from 'next/link';

import { config } from '@/config/config';
import { cn } from '@/utils/cn';

interface HeaderProps {
  currentPath?: string;
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

export const Header = ({ currentPath, className }: HeaderProps) => {
  return (
    <header
      className={cn(
        'flex items-center justify-between border-b border-base-foreground py-4',
        className,
      )}
    >
      <Logo />
      <nav className="flex items-center justify-center">
        <ul className="flex gap-3">
          {[
            {
              title: 'about',
              url: '/about',
            },
            {
              title: 'login',
              url: '/login',
            },
          ].map(({ title, url }) => {
            const isCurrent = currentPath === url;
            return (
              <li key={title}>
                <Link
                  href={url}
                  className={cn(
                    'p-4 text-lg transition-colors duration-300 ease-in-out hover:text-primary font-bold',
                    isCurrent && 'text-primary',
                  )}
                >
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
