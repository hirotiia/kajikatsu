import { CircleUserRound } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/utils/cn';

type UserAvatarInfoProps = {
  avatarUrl?: string | null;
  username: string;
  role?: string | null;
  size?: number;
  className?: string;
  textMaxWidthClass?: string;
};

/**
 * アバター画像とユーザー名・ロールなどを表示する汎用コンポーネント
 */
export function UserAvatarInfo({
  avatarUrl,
  username,
  role,
  size = 30,
  className,
  textMaxWidthClass = '',
}: UserAvatarInfoProps) {
  return (
    <div className={cn('flex gap-4 items-center', className)}>
      <div
        className="shrink-0 overflow-hidden rounded-full"
        style={{ width: size, height: size }}
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`${username}のアバター`}
            width={size}
            height={size}
            className="size-full object-cover"
          />
        ) : (
          <CircleUserRound size={size} />
        )}
      </div>

      <div className="flex flex-col">
        <p className={cn('whitespace-normal break-all', textMaxWidthClass)}>
          <b>{username}</b>
        </p>
        {role && (
          <p
            className={cn(
              'whitespace-normal break-all text-xs',
              textMaxWidthClass,
            )}
          >
            {role}
          </p>
        )}
      </div>
    </div>
  );
}
