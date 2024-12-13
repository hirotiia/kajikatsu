'use client';

import {
  ChartPie,
  Home,
  Info,
  LucideProps,
  NotebookText,
  Settings,
  UserRoundPlus,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/utils/cn';

interface SideNavigationItem {
  name: string;
  to: string;
  icon: React.ComponentType<LucideProps>;
}

export const LayoutAside = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const pathname = usePathname();
  const navigation = [
    { name: 'ダッシュボード', to: '/dashboard', icon: Home },
    { name: 'やることリスト', to: '/todos', icon: NotebookText },
    { name: 'グループ', to: '/group', icon: UserRoundPlus },
    { name: '統計・レポート', to: '/report', icon: ChartPie },
    { name: '設定', to: '/settings', icon: Settings },
    { name: '通知', to: '/information', icon: Info },
  ].filter(Boolean) as SideNavigationItem[];
  return (
    <aside className="glassmorphism fixed top-[150px] col-start-1 row-start-2 text-primary-foreground max-md:mt-6 md:col-start-1 md:row-span-1 md:max-w-[250px]">
      <nav>
        <ul className="items-center justify-center gap-10 max-md:flex max-md:p-2">
          {navigation.map(({ name, to, icon: Icon }) => {
            const isCurrent = pathname === to;

            return (
              <li key={name}>
                <Link
                  href={to}
                  className={cn(
                    'flex items-center gap-2 transition ease-out hover:text-primary max-md:flex-col md:p-4',
                    isCurrent && 'text-primary',
                  )}
                >
                  <Icon size={isMobile ? 30 : 20} className="shrink-0" />
                  {!isMobile && <span className="max-md:text-sm">{name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
