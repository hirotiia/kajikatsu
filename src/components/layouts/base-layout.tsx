import Image from 'next/image';
import Link from 'next/link';

import { config } from '@/config/config';
import { zen_maru_gothic } from '@/font/font';
import { cn } from '@/utils/cn';

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

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body
      className={cn(zen_maru_gothic.className, 'grid grid-cols-custom-layout')}
    >
      <div className="col-span-3 grid grid-cols-custom-layout gap-layout-gap">
        <div className="col-start-2 grid min-h-dvh grid-rows-[auto_1fr_auto]">
          <header className="flex items-center justify-between border-b border-base-foreground py-4">
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
                  return (
                    <li key={title}>
                      <Link
                        href={url}
                        className="p-4 text-lg transition-colors duration-300 ease-in-out hover:text-primary"
                      >
                        {title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </header>
          <main className="pb-24 pt-20">{children}</main>
          <footer className="py-4">
            <p className="text-right">
              <small>©2024 nakano hiroya</small>
            </p>
          </footer>
        </div>
      </div>
    </body>
  );
};
