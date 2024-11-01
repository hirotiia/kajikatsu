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
      to: '/about',
    },
    {
      title: 'login',
      to: '/login',
    },
  ];

  return (
    <header
      className={cn(
        'sticky top-6 mt-6 flex items-center justify-between p-4 glassmorphism z-50',
        className,
      )}
    >
      <Logo />
      <Drawer name="hamburger-menu">
        <DrawerTrigger className="relative flex h-10 w-12 items-center justify-center md:hidden">
          <span className="sr-only">メニュー</span>
        </DrawerTrigger>
        <DrawerContent className="glassmorphism gap-3 overflow-hidden px-4 max-md:absolute max-md:inset-x-0 max-md:top-[72px] max-md:min-h-[500px] max-md:w-full md:flex">
          {isAppPage && (
            <form action="/dummy" className="hidden">
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
          <nav className="items-center justify-center md:flex">
            <ul className="gap-3 md:flex">
              {globalNavigation.map(({ title, to }, i) => {
                const isCurrent = pathname === to;
                const isLastItem = i + 1 === globalNavigation.length;
                return (
                  <li key={title}>
                    <Link
                      href={to}
                      className={cn(
                        'md:border-none block py-4 border-b border-foreground text-lg transition-colors duration-300 ease-in-out hover:text-primary font-bold',
                        isCurrent && 'text-primary',
                        isLastItem ? 'md:py-4 md:pl-4' : 'md:p-4',
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
