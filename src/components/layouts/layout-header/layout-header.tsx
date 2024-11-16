import Image from 'next/image';
import Link from 'next/link';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { config } from '@/config/config';
import { currentUser } from '@/utils/auth';
import { cn } from '@/utils/cn';

import { LayoutHeaderNavigation } from './layout-navigation';

interface HeaderProps {
  className?: string;
}

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

export const LayoutHeader = async ({ className }: HeaderProps) => {
  const user = await currentUser();
  const isLogin = user ? true : false;
  return (
    <header
      className={cn(
        'sticky top-6 mt-6 flex items-center justify-between p-4 glassmorphism z-49',
        className,
      )}
    >
      <Logo />
      <Drawer name="hamburger-menu">
        <DrawerTrigger className="relative flex h-10 w-12 items-center justify-center md:hidden">
          <span className="sr-only">メニュー</span>
        </DrawerTrigger>
        <DrawerContent className="max-md:glassmorphism gap-3 overflow-hidden px-4 max-md:absolute max-md:inset-x-0 max-md:top-[72px] max-md:min-h-[500px] max-md:w-full md:flex">
          <LayoutHeaderNavigation isLogin={isLogin} />
        </DrawerContent>
      </Drawer>
    </header>
  );
};
