import { Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { config } from '@/config/config';
import { cn } from '@/utils/cn';

import { UserProfileClient } from './user-profile-client';
import { UserProfileContent } from './user-profile-content';

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
        unoptimized={true}
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
  return (
    <header
      className={cn(
        'sticky top-3 md:top-6 flex items-center justify-between p-2 md:p-4 glassmorphism z-49 h-[56px] md:h-[82px]',
        className,
      )}
    >
      <Logo />

      {isUserProfile && <UserProfileClient content={<UserProfileContent />} />}
      {isHomeLink && (
        <Link
          href="/dashboard"
          className="custom-transition grid place-items-center hover:text-primary"
        >
          <Home size={25} />
          <p>ホーム</p>
        </Link>
      )}
    </header>
  );
};
