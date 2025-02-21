import ReactMarkdown from 'react-markdown';

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
  className?: string;
};

export const Tasks = ({ listItems, className }: TasksProps) => {
  return (
    <ul className="grid gap-y-3">
      {listItems.map(
        ({ id, title, description, expiresAt, avatar_url, statusId }) => (
          <li key={id}>
            <div
              className={cn(
                'grid grid-rows-[auto_auto_auto] items-center justify-between gap-x-2 gap-y-1 rounded p-4',
                className,
              )}
            >
              <p className="col-start-2 col-end-3 text-sm text-destructive md:text-base">
                期限日：{expiresAt ? expiresAt : '未設定'}
              </p>
              <p
                className={cn(
                  'col-end-3 text-base  md:text-xl',
                  avatar_url ? 'col-start-2' : 'col-start-1',
                )}
              >
                <b>タイトル：{title}</b>
              </p>
              {description && (
                <ReactMarkdown
                  className={cn(
                    'col-end-3 markdown',
                    avatar_url ? 'col-start-2' : 'col-start-1',
                  )}
                >
                  {description}
                </ReactMarkdown>
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
