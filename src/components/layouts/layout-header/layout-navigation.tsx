'use client';
import { LogOut, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { signOut } from '@/actions/auth';
import { cn } from '@/utils/cn';

export const LayoutHeaderNavigation = ({ isLogin }: { isLogin: boolean }) => {
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
  ];

  return (
    <>
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
                    'md:border-none block py-4 border-b border-foreground text-lg transition-colors duration-300 ease-out hover:text-primary font-bold',
                    isCurrent && 'text-primary',
                    isLastItem ? 'md:py-4 md:pl-4' : 'md:p-4',
                  )}
                >
                  {title}
                </Link>
              </li>
            );
          })}
          <li>
            <form action={signOut}>
              <button
                className={cn(
                  'flex items-center gap-2 md:p-4 transition-colors duration-300 ease-out',
                  isLogin ? 'hover:text-destructive' : 'hover:text-primary',
                )}
              >
                {isLogin && (
                  <>
                    <LogOut className="text-lg" />
                    <span className="sr-only">ログアウト</span>
                  </>
                )}
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </>
  );
};
