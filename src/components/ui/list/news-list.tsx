import { Frown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/utils/cn';

type YYYYMMDD =
  `${number}${number}${number}${number}-${number}${number}-${number}${number}`;

type NewsListItem = {
  key: string;
  avatarUrl?: string;
  date: YYYYMMDD;
  title: string;
  link: string;
};

type NewsListProps = {
  items: NewsListItem[];
  className?: string;
};

export const NewsList = ({ items = [], className }: NewsListProps) => {
  return (
    <ol className={cn('grid gap-y-3', className)}>
      {items.map(({ key, avatarUrl, date, link, title }: NewsListItem) => (
        <li
          key={key}
          className="border-b border-foreground pb-3 last:border-b-0 last:pb-0"
        >
          <div className="flex gap-x-3 md:items-center">
            <div className="shrink-0 overflow-hidden rounded-full">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="ユーザーアバター"
                  width={30}
                  height={30}
                />
              ) : (
                <Frown size={30}>アイコン未登録のユーザー</Frown>
              )}
            </div>
            <div className="md:flex md:gap-x-3">
              <div className="">
                <time dateTime={date}>{date}</time>
              </div>
              <Link
                href={link}
                className="custom-transition hover:text-primary"
              >
                <b>{title}</b>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};
