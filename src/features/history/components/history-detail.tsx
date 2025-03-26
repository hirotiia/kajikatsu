import Image from 'next/image';
import { notFound } from 'next/navigation';

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
  console.log(data.details);

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

/* -------------------------------
 *  TaskDetails
 * ----------------------------- */
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

/**
 * 「タスク詳細」を DefinitionList で表示
 * - 主キーをユーザー名等に置き換える処理 → 値が無い場合の補完 → 差分検知(赤線/緑字)
 */
const TaskDetails = async ({
  task,
  changes = [],
  isOld = false,
}: TaskDetailsProps) => {
  if (!task) return null;

  const items: DefinitionListItem[] = [];
  const FIELD_CONFIG: Array<{
    fieldKey: string;
    label: string;
    defaultValue: string;
    multiline?: boolean;
    transform?: (val: any, task: any) => Promise<string>;
  }> = [
    {
      fieldKey: 'title',
      label: 'タイトル',
      defaultValue: 'なし',
    },
    {
      fieldKey: 'description',
      label: '説明',
      defaultValue: 'なし',
      multiline: true,
    },
    {
      fieldKey: 'status_id',
      label: 'ステータス',
      defaultValue: 'なし',
      transform: async (_, t) => t.status?.name ?? '不明',
    },
    {
      fieldKey: 'assignee_id',
      label: '担当者',
      defaultValue: 'なし',

      transform: async (value, t) => {
        if (!value && t.assignee?.username) {
          return t.assignee.username;
        }

        if (value) {
          const name = await fetchUserNameById(value);
          return name ?? '不明ユーザー';
        }
        return 'なし';
      },
    },
    {
      fieldKey: 'group_id',
      label: 'グループ',
      defaultValue: '未加入',
      transform: async (_, t) => t.group?.name ?? '未加入',
    },
    {
      fieldKey: 'expires_at',
      label: '期限',
      defaultValue: 'なし',
      transform: async (_, t) =>
        t.expiresAt ? toJstString(t.expiresAt) : 'なし',
    },
  ];

  for (const config of FIELD_CONFIG) {
    const { fieldKey, label, defaultValue, multiline, transform } = config;
    const rawVal = task[fieldKey] ?? '';

    let transformedVal = rawVal || defaultValue;
    if (typeof transform === 'function') {
      transformedVal = await transform(rawVal, task);
    }

    const changedItem = changes.find((c) => c.field === fieldKey);
    let finalVal = transformedVal;
    let textClass = '';

    if (changedItem) {
      const base = isOld ? changedItem.oldValue : changedItem.newValue;
      finalVal = base || defaultValue;
      textClass = isOld ? 'text-red-500 line-through' : 'text-green-600';
    }

    items.push({
      term: label,
      definitions: [
        <span
          key={fieldKey}
          className={textClass}
          style={multiline ? { whiteSpace: 'pre-wrap' } : {}}
        >
          {finalVal}
        </span>,
      ],
    });
  }

  return <DefinitionList items={items} />;
};
