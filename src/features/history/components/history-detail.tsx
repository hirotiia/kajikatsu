import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Label } from '@/components/ui/label';
import { DefinitionList } from '@/components/ui/list';
import { fetchTaskHistoryById } from '@/lib/supabase/data/task-history/select/fetch-task-history-by-id';
import { cn } from '@/utils/cn';
import { toJstString } from '@/utils/to-jst-string';

import {
  formatTaskHistoryComparisonForDefinitionList,
  formatTaskHistoryForDefinitionList,
} from './format-task-hisotry-for-definition-list';

type HistoryDetailProps = {
  id: string;
  className?: string;
};

export const HistoryDetail = async ({ id, className }: HistoryDetailProps) => {
  const taskHistory = await fetchTaskHistoryById(id);
  if (!taskHistory) {
    notFound();
  }

  const formattedDate = toJstString(taskHistory.changedAt);

  return (
    <div className={cn('', className)}>
      <div className="mb-4 flex items-center gap-2">
        <div className="flex items-center gap-2">
          {taskHistory.changedBy.avatarUrl && (
            <Image
              src={taskHistory.changedBy.avatarUrl}
              alt={`${taskHistory.changedBy.username}さんのアバター`}
              className="size-8 rounded-full"
              width={30}
              height={30}
            />
          )}
          <span>{taskHistory.changedBy.username}</span>
        </div>
        <span className="text-sm text-gray-500">{formattedDate}</span>
        <Label variant={taskHistory.action.name}>
          {formatActionName(taskHistory.action.name)}
        </Label>
      </div>

      {taskHistory.action.name === 'updated' && (
        <>
          <div className="flex flex-col gap-3 md:flex-row">
            <Box mt="none" className="flex-1">
              <Heading as="h3" underline underlineSize="full">
                変更前
              </Heading>
              {renderUpdateComparison(taskHistory, true)}
            </Box>
            <Box mt="none" className="flex-1">
              <Heading as="h3" underline underlineSize="full">
                変更後
              </Heading>
              {renderUpdateComparison(taskHistory, false)}
            </Box>
          </div>
        </>
      )}

      {taskHistory.action.name === 'created' && (
        <Box>
          <Heading as="h3" underline underlineSize="full">
            作成されたタスク
          </Heading>
          <DefinitionList
            items={formatTaskHistoryForDefinitionList(taskHistory)}
          />
        </Box>
      )}

      {taskHistory.action.name === 'deleted' && (
        <Box>
          <Heading as="h3" underline underlineSize="full">
            削除されたタスク
          </Heading>
          <DefinitionList
            items={formatTaskHistoryForDefinitionList(taskHistory, true)}
          />
        </Box>
      )}

      {taskHistory.action.name === 'completed' && (
        <Box>
          <Heading as="h3" underline underlineSize="full">
            完了したタスク
          </Heading>
          <DefinitionList
            items={formatTaskHistoryForDefinitionList(taskHistory)}
          />
        </Box>
      )}
    </div>
  );
};

/**
 * アクション名を日本語表示に変換する
 */
function formatActionName(
  actionName: 'updated' | 'completed' | 'created' | 'deleted' | undefined,
): string {
  switch (actionName) {
    case 'updated':
      return '更新';
    case 'completed':
      return '完了';
    case 'created':
      return '作成';
    case 'deleted':
      return '削除';
    default:
      return 'その他';
  }
}

/**
 * 変更前後の比較を表示するコンポーネント
 */
function renderUpdateComparison(taskHistory: any, isOld: boolean) {
  const { beforeItems, afterItems } =
    formatTaskHistoryComparisonForDefinitionList(taskHistory);

  return (
    <DefinitionList items={isOld ? beforeItems : afterItems} textSize="sm" />
  );
}
