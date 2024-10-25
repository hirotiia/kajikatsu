'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    console.log(headerRef.current);
    if (headerRef.current) {
      const contentHeight = headerRef.current.scrollHeight + 'px';
      headerRef.current.style.setProperty(
        '--accordion-content-height',
        contentHeight,
      );
      console.log('CSS変数 --accordion-content-height の値:', contentHeight);
    }
  }, [isOpen]);
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

  const toggleAccordion = () => setIsOpen((prev) => !prev);
  return (
    <header
      ref={headerRef}
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
        onClick={toggleAccordion}
      >
        <span className="sr-only">メニュー</span>
        {isOpen ? (
          <span className="relative inline-block size-6 before:absolute before:left-1/2 before:top-1/2 before:block before:h-0.5 before:w-6 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:bg-foreground before:transition-transform before:duration-300 after:absolute after:left-1/2 after:top-1/2 after:block after:h-0.5 after:w-6 after:-translate-x-1/2 after:-translate-y-1/2 after:-rotate-45 after:bg-foreground after:transition-transform after:duration-300"></span>
        ) : (
          <span
            className={
              'relative block h-0.5 w-6 bg-foreground transition duration-300 ease-in-out before:absolute before:h-0.5 before:w-6 before:-translate-y-2 before:bg-foreground before:transition before:duration-300 before:ease-in-out after:absolute after:h-0.5 after:w-6 after:translate-y-2 after:bg-foreground after:transition after:duration-300 after:ease-in-out'
            }
          ></span>
        )}
      </button>
      <div
        className={cn(
          'overflow-hidden max-md:absolute max-md:top-[72px] max-md:w-full max-md:bg-white max-md:left-0 max-md:right-0 gap-3 md:flex min-h-[500px]',
          isOpen
            ? 'block animate-accordion-down'
            : 'hidden animate-accordion-up',
        )}
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
      </div>
    </header>
  );
};
