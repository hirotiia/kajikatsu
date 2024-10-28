import { cn } from '@/utils/cn';

type InfoListItem = {
  date: string;
  expireDate: string;
  title: string;
  description: string;
};
type InfoListProps = {
  as?: 'ol' | 'ul';
  items: InfoListItem[];
  className?: string;
};

export const InfoList = ({
  as: Tag = 'ul',
  items,
  className,
}: InfoListProps) => {
  return (
    <Tag className={cn('grid gap-y-4', className)}>
      {items.map(({ date, expireDate, title, description }) => {
        return (
          <li
            key={title}
            className="bg-muted/90 rounded-lg p-3 shadow-md backdrop-blur-sm"
          >
            <div className="">
              <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-sm">
                <dt>登録日：</dt>
                <dd>{date}</dd>
                <dt className="text-destructive">期限日：</dt>
                <dd className="text-destructive">{expireDate}</dd>
              </dl>
              <p className="text-lg">
                <b>{title}</b>
              </p>
              <p>{description}</p>
            </div>
          </li>
        );
      })}
    </Tag>
  );
};
