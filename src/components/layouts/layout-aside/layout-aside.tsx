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

import { cn } from '@/utils/cn';

interface SideNavigationItem {
  name: string;
  to: string;
  icon: React.ComponentType<LucideProps>;
}

export const LayoutAside = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const navigation = [
    { name: 'ホーム', to: '/dashboard', icon: Home },
    { name: 'おしごと', to: '/todos', icon: NotebookText },
    { name: 'グループ', to: '/group', icon: UserRoundPlus },
    { name: 'りれき', to: '/history', icon: History },
    { name: 'せってい', to: '/settings', icon: Settings },
    { name: 'おしらせ', to: '/information', icon: Info },
  ].filter(Boolean) as SideNavigationItem[];
  return (
    <aside className={cn(className)}>
      <nav className="glassmorphism text-primary-foreground">
        <ul className="items-center max-md:mx-auto max-md:flex max-md:max-w-[500px] max-md:gap-[5px] max-md:px-1 max-md:py-2">
          {navigation.map(({ name, to, icon: Icon }) => {
            const isCurrent = pathname === to || pathname.startsWith(`${to}/`);

            return (
              <li key={name} className="max-md:w-[calc(100%/6+5px*5)]">
                <Link
                  href={to}
                  className={cn(
                    'text-foreground flex items-center transition ease-out hover:text-primary max-md:flex-col md:p-4 md:gap-2',
                    isCurrent && 'text-primary',
                  )}
                >
                  <Icon size={25} className="shrink-0" />
                  <span className="max-md:text-xs">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
