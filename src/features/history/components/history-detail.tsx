import Image from 'next/image';
import { notFound } from 'next/navigation';
import { JSX } from 'react';

import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Label } from '@/components/ui/label';
import { DefinitionListItem, DefinitionList } from '@/components/ui/list';
import { fetchTaskHistoryById } from '@/lib/supabase/data/task-history/select/fetch-task-history-by-id';
import { fetchUserNameById } from '@/lib/supabase/data/users/fetch-user-name-by-id';
import { cn } from '@/utils/cn';
import { toJstString } from '@/utils/to-jst-string';

type HistoryDetailProps = {
  historyId: string;
  className?: string;
};

export const HistoryDetail = async ({
  historyId,
  className,
}: HistoryDetailProps) => {
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
        <>
          <div className="flex flex-col gap-3 md:flex-row">
            <Box mt="none" className="flex-1">
              <Heading as="h3" underline underlineSize="full">
                変更前
              </Heading>
              <TaskDetails
                task={data.details.old}
                changes={data.details.changes}
                isOld
              />
            </Box>
            <Box mt="none" className="flex-1">
              <Heading as="h3" underline underlineSize="full">
                変更後
              </Heading>
              <TaskDetails
                task={data.details.new}
                changes={data.details.changes}
              />
            </Box>
          </div>
          <ChangesList changes={data.details.changes} />
        </>
      )}

      {data.action.name === 'created' && (
        <Box>
          <Heading as="h3">作成されたタスク</Heading>
          <TaskDetails task={data.details.new} />
        </Box>
      )}

      {data.action.name === 'deleted' && (
        <Box>
          <Heading as="h3">削除されたタスク</Heading>
          <TaskDetails task={data.details.old} />
        </Box>
      )}
    </div>
  );
};

type ChangeItem = {
  field: string;
  oldValue: string | null;
  newValue: string | null;
};

type TaskDetailsProps = {
  task: any;
  changes?: ChangeItem[];
  isOld?: boolean;
};

const TaskDetails = async ({
  task,
  changes = [],
  isOld = false,
}: TaskDetailsProps) => {
  if (!task) return null;
  const items: DefinitionListItem[] = [];

  async function getDisplayValue(fieldKey: string, defaultValue: string) {
    const changedItem = changes.find((c) => c.field === fieldKey);
    let rawValue = task[fieldKey] || defaultValue;
    let textClasses = '';

    if (changedItem) {
      rawValue = isOld
        ? changedItem.oldValue || defaultValue
        : changedItem.newValue || defaultValue;

      textClasses = isOld ? 'text-red-500 line-through' : 'text-green-600';
    }

    return {
      rawValue,
      textClasses,
    };
  }

  function makeItem(term: string, content: JSX.Element) {
    items.push({
      term,
      definitions: [content],
    });
  }

  if ('title' in task) {
    const { rawValue, textClasses } = await getDisplayValue('title', 'なし');
    makeItem(
      'タイトル',
      <span key="title-value" className={textClasses}>
        {rawValue}
      </span>,
    );
  }

  if ('description' in task) {
    const fieldKey = 'description';
    const { rawValue, textClasses } = await getDisplayValue(fieldKey, 'なし');
    makeItem(
      '説明',
      <span
        key={`${fieldKey}-value`}
        className={textClasses}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {rawValue}
      </span>,
    );
  }

  if (task.status) {
    const { textClasses } = await getDisplayValue('status_id', 'なし');
    makeItem(
      'ステータス',
      <span key="status-value" className={textClasses}>
        {task.status.name || '不明'}
      </span>,
    );
  }

  {
    const { rawValue, textClasses } = await getDisplayValue(
      'assignee_id',
      'なし',
    );

    let displayUser = rawValue;

    const userName = await fetchUserNameById(rawValue);
    displayUser = userName || '不明ユーザー';

    if (changes.length === 0 && task.assignee?.username) {
      displayUser = task.assignee.username;
    }

    makeItem(
      '担当者',
      <span key="assignee-value" className={textClasses}>
        {displayUser}
      </span>,
    );
  }

  if (task.group) {
    const { textClasses } = await getDisplayValue('group_id', '未加入');
    const displayGroupName = task.group.name || '未加入';

    makeItem(
      'グループ',
      <span key="group-value" className={textClasses}>
        {displayGroupName}
      </span>,
    );
  } else {
    items.push({
      term: 'グループ',
      definitions: ['未加入'],
    });
  }

  {
    const { rawValue, textClasses } = await getDisplayValue(
      'expires_at',
      'なし',
    );

    const dateText = task.expiresAt ? toJstString(task.expiresAt) : rawValue;

    makeItem(
      '期限',
      <span key="expiresAt-value" className={textClasses}>
        {dateText}
      </span>,
    );
  }

  return <DefinitionList items={items} />;
};

const ChangesList = ({ changes }: { changes: ChangeItem[] }) => {
  if (!changes || changes.length === 0) return null;

  return (
    <div className="mt-4">
      <Heading as="h3">変更内容</Heading>
      <ul className="list-disc space-y-1 pl-5">
        {changes.map((change, index) => (
          <li key={`${change.field}-${index}`} className="text-sm">
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
