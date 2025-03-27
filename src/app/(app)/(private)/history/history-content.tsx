import { notFound } from 'next/navigation';
import { JSX } from 'react';

import { buildCreatedMessage } from '@/features/history/components/build-create-messages';
import { buildDeletedMessage } from '@/features/history/components/build-delete-messages';
import { buildDiffMessages } from '@/features/history/components/build-diff-messages';
import { FilteredHistoryList } from '@/features/history/components/filtered-history-list';
import { fetchActionNameById } from '@/lib/supabase/data/actions/select/fetch-action-name-by-id';
import { fetchStatusNameById } from '@/lib/supabase/data/statuses/select/fetch-status-name-by-id';
import { fetchTaskHistory } from '@/lib/supabase/data/task-history/select/fetch-task-history';
import { fetchUserNameById } from '@/lib/supabase/data/users/fetch-user-name-by-id';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import { getUser } from '@/lib/supabase/user/user';
import { extractChangedFields } from '@/utils/extract-changed-fields';

type HistoryItem = {
  id: string;
  userName: string;
  changedAt: string;
  avatarURL: string;
  action: string;
  taskDiff: string | JSX.Element;
};

export const HistoryContent = async () => {
  const { user, authError } = await getUser();

  if (authError || !user) {
    notFound();
  }

  const userId = user?.id ?? null;
  if (!userId) {
    notFound();
  }
  const userData = await fetchUserData(userId);

  if (!userData?.group?.id) {
    notFound();
  }

  const historyData = await fetchTaskHistory({
    userId,
    groupId: userData?.group?.id,
  });

  const historyList: HistoryItem[] = await Promise.all(
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
        changedAt: item.changed_at ?? '',
        userName,
        avatarURL,
        action,
        taskDiff,
      };
    }),
  );

  if (!historyList || historyList.length === 0) {
    return <p>履歴が見つかりませんでした。</p>;
  }

  const historyListItems = historyList.map((item) => {
    let actionLabel = '';
    switch (item.action) {
      case 'created':
        actionLabel = '新しいタスクを作成';
        break;
      case 'updated':
        actionLabel = 'タスクを更新';
        break;
      case 'deleted':
        actionLabel = 'タスクを削除';
        break;
      case 'completed':
        actionLabel = 'タスクを完了';
        break;
      default:
        actionLabel = '操作';
        break;
    }

    const title = `${item.userName}さん が${actionLabel}しました！`;

    return {
      key: item.id,
      avatarUrl: item.avatarURL,
      updatedAt: item.changedAt,
      title,
      link: `/history/${item.id}`,
    };
  });

  return <FilteredHistoryList historyListItems={historyListItems} />;
};
