'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
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

export const Header = ({ className }: HeaderProps) => {
  const pathname = usePathname();
  const applicationPage = [
    '/dashboard',
    '/pairing',
    'report',
    'settings',
    '/todos',
  ];
  const isAppPage = applicationPage.some((page) => pathname.includes(page));

  const globalNavigation = [
    {
      title: 'about',
      url: '/about',
    },
    {
      title: 'login',
      url: '/login',
    },
  ];

  return (
    <header
      className={cn(
        'flex items-center justify-between border-b border-base-foreground p-4',
        className,
      )}
    >
      <Logo />
      <Drawer name="hamburger-menu">
        <DrawerTrigger className="relative flex h-10 w-12 items-center justify-center md:hidden">
          <span className="sr-only">メニュー</span>
        </DrawerTrigger>
        <DrawerContent className="gap-3 overflow-hidden max-md:absolute max-md:inset-x-0 max-md:top-[72px] max-md:min-h-[500px] max-md:w-full max-md:bg-white md:flex">
          {isAppPage && (
            <form action="/dummy">
              <label className="relative">
                <button className="absolute left-1 top-1/2 block -translate-y-1/2">
                  <Search size={20} className="text-primary" />
                </button>
                <input
                  type="text"
                  className="border border-primary bg-base p-2 pl-8"
                  placeholder="タスクを検索"
                />
              </label>
            </form>
          )}
          <nav className="flex items-center justify-center">
            <ul className="flex gap-3">
              {globalNavigation.map(({ title, url }, i) => {
                const isCurrent = pathname === url;
                const isLastItem = i + 1 === globalNavigation.length;
                return (
                  <li key={title}>
                    <Link
                      href={url}
                      className={cn(
                        'text-lg transition-colors duration-300 ease-in-out hover:text-primary font-bold',
                        isCurrent && 'text-primary',
                        isLastItem ? 'py-4 pl-4' : 'p-4',
                      )}
                    >
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </DrawerContent>
      </Drawer>
    </header>
  );
};
