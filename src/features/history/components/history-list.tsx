import { CircleUserRound } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { Disclosure } from '@/components/ui/disclosure';
import { fetchActionNameById } from '@/lib/supabase/data/actions/select/fetch-action-name-by-id';
import { fetchStatusNameById } from '@/lib/supabase/data/statuses/select/fetch-status-name-by-id';
import { fetchTaskHistory } from '@/lib/supabase/data/task-history/select/fetch-task-history';
import { fetchUserNameById } from '@/lib/supabase/data/users/fetch-user-name-by-id';
import { createClient } from '@/lib/supabase/server';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import { cn } from '@/utils/cn';
import { extractChangedFields } from '@/utils/extract-changed-fields';

import { buildCreatedMessage } from './build-create-messages';
import { buildDeletedMessage } from './build-delete-messages';
import { buildDiffMessages } from './build-diff-messages';

type HistoryList = {
  className?: string;
};

export const HistoryList = async ({ className }: HistoryList) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id ?? null;
  if (!userId) {
    redirect('/login');
  }
  const userData = await fetchUserData(userId);

  if (!userData?.group?.id) {
    redirect('/login');
  }

  const historyData = await fetchTaskHistory({
    userId,
    groupId: userData?.group?.id,
  });

  const historyList = await Promise.all(
    historyData.map(async (item) => {
      const changeUser = await fetchUserData(item.changed_by);
      const userName = changeUser?.username ?? 'unknown user';
      const avatarURL = changeUser?.avatar_url ?? '';

      const actionName = await fetchActionNameById(item.action_id);
      const action = actionName ?? '';

      let taskDiff: string | React.JSX.Element = '';

      if (action === 'updated') {
        const diff = extractChangedFields(item.details);

        if (diff) {
          if (diff.status_id) {
            const oldStatusId = diff.status_id.old;
            const newStatusId = diff.status_id.new;

            // DBからステータス名を取得
            const oldStatusName = await fetchStatusNameById(oldStatusId);
            const newStatusName = await fetchStatusNameById(newStatusId);

            // 取得できなかった場合はIDをそのまま
            diff.status_id.old = oldStatusName || oldStatusId;
            diff.status_id.new = newStatusName || newStatusId;
          }

          if (diff.assignee_id) {
            const oldAssigneeId = diff.assignee_id.old;
            const newAssigneeId = diff.assignee_id.new;

            const oldAssigneeName = oldAssigneeId
              ? await fetchUserNameById(oldAssigneeId)
              : '未担当';
            const newAssigneeName = newAssigneeId
              ? await fetchUserNameById(newAssigneeId)
              : '未担当';

            diff.assignee_id = {
              old: oldAssigneeName,
              new: newAssigneeName,
            };
          }
          taskDiff = buildDiffMessages(diff);
        } else {
          taskDiff = '変更なし';
        }
      } else if (action === 'created') {
        const { new: newTask } = item.details;
        taskDiff = buildCreatedMessage(newTask);
      } else if (action === 'deleted') {
        const { old: oldTask } = item.details;
        taskDiff = buildDeletedMessage(oldTask);
      }

      return {
        id: item.id,
        userName,
        avatarURL,
        action,
        taskDiff,
      };
    }),
  );

  if (!historyList) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cn('grid gap-y-3 md:mt-6 mt-3', className)}>
      {historyList.map((history) => {
        let actionLabel: string;
        switch (history.action) {
          case 'created':
            actionLabel = '新しいタスクを作成';
            break;
          case 'updated':
            actionLabel = 'タスクを更新';
            break;
          case 'deleted':
            actionLabel = 'タスクを削除';
            break;
          default:
            actionLabel = '操作';
            break;
        }

        const overview = `${history.userName} が${actionLabel}しました。`;

        if (!history.taskDiff) {
          return (
            <div
              className="flex items-center gap-2 overflow-hidden rounded-full border bg-background p-3 text-foreground"
              key={history.id}
            >
              {history.avatarURL ? (
                <Image
                  src={history.avatarURL}
                  width={30}
                  height={30}
                  alt="avatar"
                  className="size-full object-cover"
                />
              ) : (
                <CircleUserRound size="30">デフォルトアイコン</CircleUserRound>
              )}
              <p>{overview}</p>
            </div>
          );
        } else {
          return (
            <Disclosure
              key={history.id}
              id={history.id}
              overview={overview}
              detail={history.taskDiff}
              icon={history.avatarURL}
            />
          );
        }
      })}
    </div>
  );
};
