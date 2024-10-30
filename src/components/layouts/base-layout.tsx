'use client';

import {
  Home,
  NotebookText,
  UserRoundPlus,
  ChartPie,
  Settings,
  LucideProps,
} from 'lucide-react';
import Link from 'next/link';

import { useMediaQuery } from '@/hooks/use-media-query';

import { Header } from './header/header';

interface SideNavigationItem {
  name: string;
  to: string;
  icon: React.ComponentType<LucideProps>;
}

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const navigation = [
    { name: 'ダッシュボード', to: '/dashboard', icon: Home },
    { name: 'やることリスト', to: '/todos', icon: NotebookText },
    { name: 'ペアリング', to: '/pairing', icon: UserRoundPlus },
    { name: '統計・レポート', to: '/report', icon: ChartPie },
    { name: '設定', to: '/settings', icon: Settings },
  ].filter(Boolean) as SideNavigationItem[];

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isLogin = true;

  return (
    <div className="grid grid-cols-custom-layout bg-custom-gradient">
      <div className="col-span-3 grid grid-cols-custom-layout gap-layout-gap">
        <div className="col-start-2 grid min-h-dvh grid-cols-1 grid-rows-[auto_auto_1fr_auto] md:grid-cols-[auto_1fr] md:grid-rows-[auto_1fr_auto] md:gap-6">
          <Header className="col-start-1 col-end-3" />
          <main className="col-start-1 row-start-3 pb-24 pt-12 md:col-start-2 md:row-start-2 md:p-4">
            {children}
          </main>
          {isLogin && (
            <aside className="glassmorphism col-start-1 row-start-2 mt-6 text-primary-foreground md:col-start-1 md:row-span-1">
              <nav>
                <ul className="items-center justify-center gap-10 max-md:flex max-md:p-2">
                  {navigation.map(({ name, to, icon: Icon }) => {
                    return (
                      <li key={name}>
                        <Link
                          href={to}
                          className="flex items-center gap-2 transition ease-out hover:bg-secondary max-md:flex-col md:p-4"
                        >
                          <Icon size={isMobile ? 30 : 20} />
                          {!isMobile && (
                            <span className="max-md:text-sm">{name}</span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          )}
          <footer className="col-start-1 row-start-4 py-4 md:col-start-1 md:col-end-3">
            <p className="text-right">
              <small>©2024 nakano hiroya</small>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};
