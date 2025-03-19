import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Heading } from '@/components/ui/heading';
import { Label } from '@/components/ui/label';
import { fetchTaskHistoryById } from '@/lib/supabase/data/task-history/select/fetch-task-history-by-id';
import { cn } from '@/utils/cn';
import { toJstString } from '@/utils/to-jst-string';

type HistoryList = {
  historyId: string;
  className?: string;
};

export const HistoryList = async ({ historyId, className }: HistoryList) => {
  const data = await fetchTaskHistoryById(historyId);

  if (!data) {
    notFound();
  }

  const formattedDate = toJstString(data.changedAt);

  return (
    <div className={cn('', className)}>
      <div className="mb-4 flex items-center gap-2">
        <div className="flex items-center gap-2">
          {data.changedBy.avatarUrl && (
            <Image
              src={data.changedBy.avatarUrl}
              alt={`${data.changedBy.username}さんのアバター`}
              className="size-8 rounded-full"
              width={30}
              height={30}
            />
          )}
          <span>{data.changedBy.username}</span>
        </div>
        <span className="text-sm text-gray-500">{formattedDate}</span>
        <Label variant={data.action.name}>{data.action.name}</Label>
      </div>

      {data.action.name === 'updated' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded border bg-gray-50 p-3 [&>*:first-child]:mt-0 [&>*:first-child]:md:mt-0">
            <Heading as="h3">変更前</Heading>
            <TaskDetails task={data.details.old} />
          </div>
          <div className="rounded border bg-gray-50 p-3 [&>*:first-child]:mt-0 [&>*:first-child]:md:mt-0">
            <Heading as="h3">変更後</Heading>
            <TaskDetails task={data.details.new} />
          </div>
          <div className="col-span-2">
            <ChangesList changes={data.details.changes} />
          </div>
        </div>
      )}

      {data.action.name === 'created' && (
        <div className="rounded border bg-gray-50 p-3 [&>*:first-child]:mt-0 [&>*:first-child]:md:mt-0">
          <Heading as="h3">作成されたタスク</Heading>
          <TaskDetails task={data.details.new} />
        </div>
      )}

      {data.action.name === 'deleted' && (
        <div className="rounded border bg-gray-50 p-3 [&>*:first-child]:mt-0 [&>*:first-child]:md:mt-0">
          <Heading as="h3">削除されたタスク</Heading>
          <TaskDetails task={data.details.old} />
        </div>
      )}
    </div>
  );
};

const TaskDetails = ({ task }: { task: any }) => {
  if (!task) return null;

  return (
    <div className="space-y-2">
      <div>
        <span className="text-sm font-medium text-gray-500">タイトル:</span>
        <span className="ml-2">{task.title}</span>
      </div>

      {task.description && (
        <div>
          <span className="text-sm font-medium text-gray-500">説明:</span>
          <p className="ml-2 whitespace-pre-wrap text-sm">{task.description}</p>
        </div>
      )}

      {task.status && (
        <div>
          <span className="text-sm font-medium text-gray-500">ステータス:</span>
          <span className="ml-2">{task.status.name}</span>
        </div>
      )}

      {task.assignee && (
        <div>
          <span className="text-sm font-medium text-gray-500">担当者:</span>
          <span className="ml-2">{task.assignee.username}</span>
        </div>
      )}

      {task.group && (
        <div>
          <span className="text-sm font-medium text-gray-500">グループ:</span>
          <span className="ml-2">{task.group.name}</span>
        </div>
      )}

      {task.expiresAt && (
        <div>
          <span className="text-sm font-medium text-gray-500">期限:</span>
          <span className="ml-2">{toJstString(task.expiresAt)}</span>
        </div>
      )}
    </div>
  );
};

const ChangesList = ({ changes }: { changes: any }) => {
  if (!changes || changes.length === 0) return null;

  return (
    <div className="mt-4">
      <Heading as="h3">変更内容</Heading>
      <ul className="list-disc space-y-1 pl-5">
        {changes.map((change: any, index: any) => (
          <li key={index} className="text-sm">
            <span className="font-medium">{change.field}:</span>
            <span className="text-destructive line-through">
              {change.oldValue || 'なし'}
            </span>
            <span className="text-gray-500">→</span>
            <span className="text-green-600">{change.newValue || 'なし'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
