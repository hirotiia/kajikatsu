import { Home, LogIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { config } from '@/config/config';
import { createClient } from '@/lib/supabase/server';
import { cn } from '@/utils/cn';

import { UserProfile } from './user-profile';

interface HeaderProps {
  className?: string;
  isUserProfile?: boolean;
  isHomeLink?: boolean;
}

const Logo = async () => {
  return (
    <Link className="flex items-center gap-3" href="/">
      <Image
        className="h-8 w-auto md:h-12"
        alt="家事活アイコン"
        src="/images/logo.svg"
        width="80"
        height="80"
      />
      <span className="text-sm font-bold md:text-base">{config.APP_NAME}</span>
    </Link>
  );
};

export const LayoutHeader = async ({
  className,
  isUserProfile = false,
  isHomeLink = false,
}: HeaderProps) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const switchLinkComponent = (): React.ReactNode => {
    return user ? (
      <Link
        href="/dashboard"
        className="custom-transition grid place-items-center hover:text-primary"
      >
        <Home size={25} />
        <p>ホーム</p>
      </Link>
    ) : (
      <Link
        href="/dashboard"
        className="custom-transition grid place-items-center hover:text-primary"
      >
        <LogIn size={25} />
        <p>ログイン</p>
      </Link>
    );
  };

  return (
    <header
      className={cn(
        'sticky top-3 md:top-6 flex items-center justify-between p-2 md:p-4 glassmorphism z-49',
        className,
      )}
    >
      <Logo />

      {isUserProfile && <UserProfile />}
      {isHomeLink && switchLinkComponent()}
    </header>
  );
};
