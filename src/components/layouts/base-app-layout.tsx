'use client';

import {
  ChartPie,
  Home,
  LucideProps,
  NotebookText,
  Settings,
  UserRoundPlus,
} from 'lucide-react';
import Link from 'next/link';

import { Header } from './header/header';

interface SideNavigationItem {
  name: string;
  to: string;
  icon: React.ComponentType<LucideProps>;
}

export const BaseAppLayout = ({ children }: { children: React.ReactNode }) => {
  const navigation = [
    { name: 'ダッシュボード', to: '/dashboard', icon: Home },
    { name: 'やることリスト', to: '/todos', icon: NotebookText },
    { name: 'ペアリング', to: '/pairing', icon: UserRoundPlus },
    { name: '統計・レポート', to: '/report', icon: ChartPie },
    { name: '設定', to: '/settings', icon: Settings },
  ].filter(Boolean) as SideNavigationItem[];
  return (
    <div className="grid min-h-screen grid-cols-1 grid-rows-[auto_auto_1fr_auto] md:grid-cols-[250px_1fr] md:grid-rows-[auto_1fr_auto]">
      <Header className="col-start-1 col-end-3" />
      <main className="col-start-1 row-start-3 pb-24 pt-20 md:col-start-2 md:row-start-2">
        <div>{children}</div>
      </main>
      <aside className="col-start-1 row-start-2 bg-primary text-primary-foreground md:col-start-1 md:row-span-3">
        <nav>
          <ul className="">
            {navigation.map(({ name, to, icon: Icon }) => {
              return (
                <li key={name}>
                  <Link
                    href={to}
                    className="flex items-center gap-2 p-4 transition ease-out hover:bg-secondary"
                  >
                    <Icon size={20} />
                    <span>{name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <footer className="col-start-1 row-start-4 p-4 md:col-start-2 md:row-start-3">
        <p className="text-right">
          <small>©2024 nakano hiroya</small>
        </p>
      </footer>
    </div>
  );
};
