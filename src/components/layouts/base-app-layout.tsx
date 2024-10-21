'use client';

import { Search, Home, NotebookText } from 'lucide-react';
import Link from 'next/link';

export const BaseAppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-screen grid-cols-1 grid-rows-[auto_auto_1fr_auto] md:grid-cols-[auto_1fr] md:grid-rows-[auto_1fr_auto]">
      <header className="col-start-1 row-start-1 md:col-start-2 md:row-start-1">
        <form action="">
          <label className="relative">
            <Search
              size={20}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-base"
            />
            <input type="text" className="p-2 pl-8" />
          </label>
        </form>
      </header>
      <main className="col-start-1 row-start-3 pb-24 pt-20 md:col-start-2 md:row-start-2">
        <div>{children}</div>
      </main>
      <aside className="col-start-1 row-start-2 p-4 md:col-start-1 md:row-span-3 md:row-start-1">
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
