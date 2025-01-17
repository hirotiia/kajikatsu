'use client';

/** TODO
 * グループのメンバーの場合、グループ内の変更タスクを取得
 * グループのメンバーではない場合、自分の変更履歴を取得
 */
import { CircleUserRound } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

import { Disclosure } from '@/components/ui/disclosure';
import { fetchActionNameById } from '@/lib/supabase/data/actions/select/fetch-action-name-by-id';
import { getTaskHistoryForClient } from '@/lib/supabase/data/task-history/select/get-task-history-for-client';
import { UserData } from '@/lib/supabase/data/users/get-user-data';
import { getUserProfileClient } from '@/lib/supabase/data/users/get-user-profile-client';
import { extractChangedFields } from '@/utils/extract-changed-fields';

import { buildDiffMessages } from '../api/build-diff-messages';

type TaskHistoryPageClientProps = {
  userData: UserData;
};

type HistoryData = {
  id: string;
  userName: string;
  avatar: string;
  action: string;
  diffString: string;
};

/**
 * タスク履歴ページ (クライアントコンポーネント)
 */
export const TaskHistoryPageClient = ({
  userData,
}: TaskHistoryPageClientProps) => {
  const [historyData, setHistoryData] = useState<HistoryData[]>([]);

  const { data: historyList, error } = useSWR(
    ['taskHistory', userData.userId, userData.groupId],
    () =>
      getTaskHistoryForClient({
        userId: userData.userId,
        groupId: userData.groupId,
      }),
  );

  useEffect(() => {
    if (!historyList) return;

    (async () => {
      const results = await Promise.all(
        historyList.map(async (item) => {
          const user = await getUserProfileClient(item.changed_by);
          const userName = user?.username ?? 'unknown user';
          const avatar = user?.avatar_url ?? '';

          const actionName = await fetchActionNameById(item.action_id);
          const action = actionName ?? '';

          let diffString = '';
          if (action === 'updated') {
            const diff = extractChangedFields(item.details);
            if (diff) {
              const lines = await buildDiffMessages(diff);
              diffString = lines.join('\n');
            } else {
              diffString = '変更なし';
            }
          }

          return {
            id: item.id,
            userName,
            avatar,
            action,
            diffString,
          };
        }),
      );
      setHistoryData(results);
    })();
  }, [historyList]);

  if (error) {
    return <div>Error loading task history: {error.message}</div>;
  }
  if (!historyList) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-y-3">
      {historyData.map((h) => {
        let actionLabel: string;
        switch (h.action) {
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

        const overview = `${h.userName} が${actionLabel}しました。`;

        if (!h.diffString) {
          console.log(`h.avatar: ${h.avatar === ''}`);
          return (
            <div
              className="flex items-center gap-2 rounded border bg-white p-3"
              key={h.id}
            >
              {h.avatar ? (
                <Image src={h.avatar} width={30} height={30} alt="avatar" />
              ) : (
                <CircleUserRound size="30">デフォルトアイコン</CircleUserRound>
              )}
              <p>{overview}</p>
            </div>
          );
        } else {
          return (
            <Disclosure
              key={h.id}
              id={h.id}
              overview={overview}
              detail={h.diffString}
              icon={h.avatar}
            />
          );
        }
      })}
    </div>
  );
};
