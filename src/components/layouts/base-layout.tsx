import Image from 'next/image';
import Link from 'next/link';

import { config } from '@/config/config';

const Logo = () => {
  return (
    <Link className="flex items-center gap-3" href="/">
      <Image
        className="h-10 w-auto md:h-12"
        alt="チャートレアイコン"
        src="/logo.svg"
        width="80"
        height="80"
      />
      <span>{config.APP_NAME}</span>
    </Link>
  );
};

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="flex items-center justify-between">
        <Logo />
        <nav className="flex items-center justify-center">
          <ul>
            {[
              {
                title: 'ログイン',
                url: '/login',
              },
            ].map(({ title, url }) => {
              return (
                <li key={title}>
                  <Link href={url}>{title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main className="mt-20">{children}</main>
      <footer className="mt-10 py-4">
        <p className="text-right">
          <small>©2024 nakano hiroya</small>
        </p>
      </footer>
    </>
  );
};
