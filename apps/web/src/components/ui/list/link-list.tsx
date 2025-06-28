import { Frown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/utils/cn';
import { toJstIsoString, toJstString } from '@/utils/to-jst-string';

export type LinkListItem = {
  key: string;
  avatarUrl?: string;
  updatedAt: string;
  title: string;
  link: string;
};

type LinkListProps = {
  items: LinkListItem[];
  className?: string;
};

export const LinkList = ({ items = [], className }: LinkListProps) => {
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
              <div className="size-[30px] overflow-hidden rounded-full">
                <Image
                  src={avatarUrl}
                  alt="ユーザーアバター"
                  width={30}
                  height={30}
                />
              </div>
            ) : (
              <Frown size={30} className="rounded-full">
                アイコン未登録のユーザー
              </Frown>
            )}

            <time dateTime={isoDate} className="text-sm md:text-base">
              {displayDate}
            </time>
            <Link
              href={link}
              className="custom-transition w-full text-sm hover:text-primary md:text-base"
            >
              <b>{title}</b>
            </Link>
          </li>
        );
      })}
    </ol>
  );
};
