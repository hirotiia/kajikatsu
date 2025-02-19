'use client';

import {
  History,
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

export const LayoutAside = ({ className }: { className?: string }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const pathname = usePathname();
  const navigation = [
    { name: 'ダッシュボード', to: '/dashboard', icon: Home },
    { name: 'やることリスト', to: '/todos', icon: NotebookText },
    { name: 'グループ', to: '/group', icon: UserRoundPlus },
    { name: '履歴', to: '/history', icon: History },
    { name: '設定', to: '/settings', icon: Settings },
    { name: 'お知らせ', to: '/information', icon: Info },
  ].filter(Boolean) as SideNavigationItem[];
  return (
    <aside className={cn(className)}>
      <nav className="glassmorphism text-primary-foreground">
        <ul className="items-center justify-around max-md:flex max-md:p-2">
          {navigation.map(({ name, to, icon: Icon }) => {
            const isCurrent = pathname === to;

            return (
              <li key={name}>
                <Link
                  href={to}
                  className={cn(
                    'flex items-center transition ease-out hover:text-primary max-md:flex-col md:p-4 md:gap-2',
                    isCurrent && 'text-primary',
                  )}
                >
                  <Icon size={25} className="shrink-0" />
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
