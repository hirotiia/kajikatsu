'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();
  const applicationPage = ['/dashbord', '/list'];
  const isAppPage = applicationPage.some((page) => pathname.includes(page));

  const clickHandler = () => {
    setOpen(!isOpen);
  };
  return (
    <header
      className={cn(
        'flex items-center justify-between border-b border-base-foreground p-4',
        className,
      )}
    >
      <Logo />
      <button
        type="button"
        aria-controls="hamburger-menu"
        aria-expanded={isOpen}
        className="relative flex h-10 w-12 items-center justify-center md:hidden"
        onClick={clickHandler}
      >
        <span className="sr-only">メニュー</span>
        {isOpen ? (
          <span className="relative inline-block size-6 before:absolute before:left-1/2 before:top-1/2 before:block before:h-0.5 before:w-6 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:bg-black before:transition-transform before:duration-300 after:absolute after:left-1/2 after:top-1/2 after:block after:h-0.5 after:w-6 after:-translate-x-1/2 after:-translate-y-1/2 after:-rotate-45 after:bg-black after:transition-transform after:duration-300"></span>
        ) : (
          <span
            className={
              'relative block h-0.5 w-6 bg-black transition duration-300 ease-in-out before:absolute before:h-0.5 before:w-6 before:-translate-y-2 before:bg-black before:transition before:duration-300 before:ease-in-out after:absolute after:h-0.5 after:w-6 after:translate-y-2 after:bg-black after:transition after:duration-300 after:ease-in-out'
            }
          ></span>
        )}
      </button>
      <div
        className={cn('gap-3 md:flex', isOpen ? 'block' : 'hidden')}
        id="hamburger-menu"
      >
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
              const isCurrent = pathname === url;
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
      </div>
    </header>
  );
};
