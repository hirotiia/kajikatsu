import Image from 'next/image';
import Link from 'next/link';

import { config } from '@/config/config';
import { createClient } from '@/lib/supabase/server';
import { cn } from '@/utils/cn';

import { UserProfile } from './user-profile';

interface HeaderProps {
  className?: string;
}

const Logo = () => {
  return (
    <Link className="flex items-center gap-3" href="/">
      <Image
        className="h-10 w-auto md:h-12"
        alt="家事活アイコン"
        src="/images/logo.svg"
        width="80"
        height="80"
      />
      <span>{config.APP_NAME}</span>
    </Link>
  );
};

export const LayoutHeader = async ({ className }: HeaderProps) => {
  const supabase = await createClient();

  // 現在ログインしているユーザー情報を取得
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <header
      className={cn(
        'sticky top-6 mt-6 flex items-center justify-between p-4 glassmorphism z-49',
        className,
      )}
    >
      <Logo />

      {user && <UserProfile />}
    </header>
  );
};
