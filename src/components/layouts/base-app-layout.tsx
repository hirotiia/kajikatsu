import { config } from '@/config/config';
import Image from 'next/image';
import Link from 'next/link';

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

export const BaseAppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="flex items-center justify-between border-b border-base-foreground py-4">
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
      <main className="pb-24 pt-20">{children}</main>
      <footer className="py-4">
        <p className="text-right">
          <small>©2024 nakano hiroya</small>
        </p>
      </footer>
    </>
  );
};
