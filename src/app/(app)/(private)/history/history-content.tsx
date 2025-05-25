import { JSX } from 'react';

import { buildCreatedMessage } from '@/features/history/components/build-create-messages';
import { buildDeletedMessage } from '@/features/history/components/build-delete-messages';
import { buildDiffMessages } from '@/features/history/components/build-diff-messages';
import { extractChangedFields } from '@/features/history/components/extract-changed-fields';
import { FilteredHistoryList } from '@/features/history/components/filtered-history-list';
import { fetchActionNameById } from '@/lib/supabase/data/actions/select/fetch-action-name-by-id';
import { fetchStatusNameById } from '@/lib/supabase/data/statuses/select/fetch-status-name-by-id';
import { fetchTaskHistory } from '@/lib/supabase/data/task-history/select/fetch-task-history';
import { fetchUserNameById } from '@/lib/supabase/data/users/fetch-user-name-by-id';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import { Tables } from '@/types/supabase/database.types';

type LinkListItem = {
  id: string;
  userName: string;
  changedAt: string;
  avatarURL: string;
  actionName: string;
  taskDiff: string | JSX.Element;
};

export const HistoryContent = async () => {
  const data = await fetchUserData();

  if (!data) return;

  const { userId, group } = data;
  const historyData = await fetchTaskHistory({
    userId,
    groupId: group?.id,
  });

  const rawList: (LinkListItem | undefined)[] = await Promise.all(
    historyData.map(async (item) => {
      const editor = await fetchUserData(item.changed_by);

      if (!editor) return undefined;

      const userName = editor.username;
      const avatarURL = editor.avatar_url ?? '';
      const actionName = await fetchActionNameById(item.action_id);

      let taskDiff: string | React.JSX.Element = '';

      if (actionName === 'updated') {
        const diff = extractChangedFields(
          item.details.old as Tables<'tasks'>,
          item.details.new as Tables<'tasks'>,
        );

        if (diff) {
          if (diff.status_id) {
            const { old: beforeStatusId, new: afterStatusId } = diff.status_id;

            const oldStatusName = await fetchStatusNameById(beforeStatusId);
            const newStatusName = await fetchStatusNameById(afterStatusId);

            // 取得できなかった場合はIDをそのまま
            diff.status_id.old = oldStatusName || beforeStatusId;
            diff.status_id.new = newStatusName || afterStatusId;
          }

          if (diff.assignee_id) {
            const { old: beforeAssigneeId, new: afterAssigneeId } =
              diff.assignee_id;

            const oldAssigneeName = beforeAssigneeId
              ? await fetchUserNameById(beforeAssigneeId)
              : '未担当';
            const newAssigneeName = afterAssigneeId
              ? await fetchUserNameById(afterAssigneeId)
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
      } else if (actionName === 'created') {
        const { new: newTask } = item.details;
        taskDiff = buildCreatedMessage(newTask);
      } else if (actionName === 'deleted') {
        const { old: oldTask } = item.details;
        taskDiff = buildDeletedMessage(oldTask);
      }

      return {
        id: item.id,
        changedAt: item.changed_at ?? '',
        userName,
        avatarURL,
        actionName,
        taskDiff,
      };
    }),
  );

  const historyList: LinkListItem[] = rawList.filter(
    (item): item is LinkListItem => item !== undefined,
  );

  if (!historyList || historyList.length === 0) {
    return <p>履歴が見つかりませんでした。</p>;
  }

  const historyListItems = historyList.map((item) => {
    let actionLabel = '';
    switch (item.actionName) {
      case 'created':
        actionLabel = '新しいおしごとを作成';
        break;
      case 'updated':
        actionLabel = 'おしごとを更新';
        break;
      case 'deleted':
        actionLabel = 'おしごとを削除';
        break;
      case 'completed':
        actionLabel = 'おしごとを完了';
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

  return (
    <>
      <FilteredHistoryList historyListItems={historyListItems} />
    </>
  );
};
