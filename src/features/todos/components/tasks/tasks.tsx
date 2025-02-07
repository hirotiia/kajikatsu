import { CircleUserRound } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/utils/cn';

import { DeleteTask } from './delete-task';
import { EditTask } from './edit-task';

type Item = {
  id: string;
  title: string;
  description?: string;
  expiresAt?: string;
  avatar_url?: string;
  statusId?: string;
};
type TasksProps = {
  listItems: Item[];
};

export const Tasks = ({ listItems }: TasksProps) => {
  return (
    <ul className="grid gap-y-3">
      {listItems.map(
        ({ id, title, description, expiresAt, avatar_url, statusId }) => (
          <li key={id}>
            <div
              className={`grid ${
                avatar_url
                  ? 'grid-cols-[auto_1fr_auto]'
                  : 'grid-cols-[1fr_auto]'
              } grid-rows-[auto_auto_auto] items-center justify-between gap-x-2 gap-y-1 rounded-md bg-background p-4`}
            >
              {avatar_url ? (
                <div className="">
                  <Image
                    src={avatar_url}
                    alt="アバター"
                    width="35"
                    height="35"
                  />
                </div>
              ) : (
                <CircleUserRound size={35} />
              )}
              <p className="col-start-2 col-end-3 text-destructive">
                期限日：{expiresAt ? expiresAt : 'なし'}
              </p>
              <p
                className={cn(
                  'col-end-3 text-xl',
                  avatar_url ? 'col-start-2' : 'col-start-1',
                )}
              >
                <b>タイトル：{title}</b>
              </p>
              {description && (
                <p
                  className={cn(
                    'col-end-3',
                    avatar_url ? 'col-start-2' : 'col-start-1',
                  )}
                >
                  概要：{description}
                </p>
              )}
              <div className="col-start-2 col-end-3 row-start-4 row-end-5 flex justify-end gap-2">
                <EditTask
                  taskId={id}
                  title={title}
                  description={description}
                  expiresAt={expiresAt}
                  statusId={statusId}
                />
                <DeleteTask taskId={id} />
              </div>
            </div>
          </li>
        ),
      )}
    </ul>
  );
};
