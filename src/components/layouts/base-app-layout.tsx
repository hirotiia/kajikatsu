'use client';

import { Home, NotebookText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Header } from './header/header';

export const BaseAppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="grid min-h-screen grid-cols-1 grid-rows-[auto_auto_1fr_auto] md:grid-cols-[auto_1fr] md:grid-rows-[auto_1fr_auto]">
      <Header currentPath={pathname} className="col-start-1 col-end-3" />
      <main className="col-start-1 row-start-3 pb-24 pt-20 md:col-start-2 md:row-start-2">
        <div>{children}</div>
      </main>
      <aside className="col-start-1 row-start-2 bg-primary p-4 text-primary-foreground md:col-start-1 md:row-span-3">
        <nav>
          <ul className="grid gap-3">
            <li>
              <Link href="/dashbord" className="flex items-center gap-2">
                <Home size={20} />
                <span>ダッシュボード</span>
              </Link>
            </li>
            <li>
              <Link href="/todos" className="flex items-center gap-2">
                <NotebookText size={20} />
                <span>家事リスト</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <footer className="col-start-1 row-start-4 py-4 md:col-start-2 md:row-start-3">
        <p className="text-right">
          <small>©2024 nakano hiroya</small>
        </p>
      </footer>
    </div>
  );
};
