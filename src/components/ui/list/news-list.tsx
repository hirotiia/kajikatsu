import { Frown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/utils/cn';
import { toJstIsoString, toJstString } from '@/utils/to-jst-string';

export type NewsListItem = {
  key: string;
  avatarUrl?: string;
  updatedAt: string;
  title: string;
  link: string;
};

type NewsListProps = {
  items: NewsListItem[];
  className?: string;
};

export const NewsList = ({ items = [], className }: NewsListProps) => {
  return (
    <ol className={cn('grid gap-y-3 grid-cols-[auto_auto_1fr]', className)}>
      {items.map(({ key, avatarUrl, updatedAt, link, title }) => {
        const displayDate = toJstString(updatedAt);
        const isoDate = toJstIsoString(updatedAt);

        return (
          <li
            key={key}
            className="col-span-3 grid grid-cols-subgrid gap-2 border-b border-foreground pb-3 last:border-b-0 last:pb-0"
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="ユーザーアバター"
                width={30}
                height={30}
                className="rounded-full"
              />
            ) : (
              <Frown size={30} className="rounded-full">
                アイコン未登録のユーザー
              </Frown>
            )}

            <time dateTime={isoDate}>{displayDate}</time>
            <Link
              href={link}
              className="custom-transition w-full hover:text-primary"
            >
              <b>{title}</b>
            </Link>
          </li>
        );
      })}
    </ol>
  );
};
