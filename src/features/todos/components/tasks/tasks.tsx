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
              } grid-rows-[auto_auto_auto] gap-x-2 gap-y-1 rounded-md bg-background p-4`}
            >
              <p className="col-start-1 col-end-2 row-start-1 row-end-2 text-destructive">
                期限日：{expiresAt ? expiresAt : 'なし'}
              </p>
              {avatar_url && (
                <div className="col-start-1 col-end-2">
                  <Image src={avatar_url} alt="アバター" />
                </div>
              )}
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
                <DeleteTask />
              </div>
            </div>
          </li>
        ),
      )}
    </ul>
  );
};
