'use client';

/** TODO
 * グループのメンバーの場合、グループ内の変更タスクを取得
 * グループのメンバーではない場合、自分の変更履歴を取得
 */
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
  diffString: string;
  action: string;
};

export const TaskHistoryPageClient = ({
  userData,
}: TaskHistoryPageClientProps) => {
  const [historyData, setHistoryData] = useState<HistoryData[]>([]);
  const { data: historyList, error } = useSWR(
    ['taskHistory', userData.userId, userData.groupId],
    // データ取得関数
    () =>
      getTaskHistoryForClient({
        userId: userData.userId,
        groupId: userData.groupId,
      }),
  );

  useEffect(() => {
    if (!historyList) return;

    (async () => {
      const result = await Promise.all(
        historyList.map(async (item) => {
          const user = await getUserProfileClient(item.changed_by);
          const action_name = await fetchActionNameById(item.action_id);

          const action = action_name ?? '';
          const userName = user?.username ?? 'unknown user';
          const avatar = user?.avatar_url ?? '';

          const diff = extractChangedFields(item.details);
          let diffString: string;

          if (!diff) {
            diffString = '変更なし';
          } else {
            const lines = await buildDiffMessages(diff);
            // 複数行をつなぐ
            diffString = lines.join('\n');
          }

          return {
            id: item.id,
            userName,
            avatar,
            diffString,
            action,
          };
        }),
      );
      setHistoryData(result);
    })();
  }, [historyList]);

  if (error) {
    return <div>Error loading task history: {error.message}</div>;
  }

  if (!historyList) {
    return <div>Loading...</div>;
  }

  console.log(historyData);

  return (
    <div className="grid gap-y-3">
      {historyData.map((h) => {
        // アクション名を元に表示するテキスト等を決定
        let actionLabel;
        switch (h.action) {
          case 'updated':
            actionLabel = 'タスクを更新';
            break;
          case 'deleted':
            actionLabel = 'タスクを削除';
            // 差分は不要 → 空にしておく
            h.diffString = '';
            break;
          case 'created':
            actionLabel = '新しいタスクを作成';
            // 差分は不要 → 空にしておく
            h.diffString = '';
            break;
          default:
            actionLabel = '操作';
            break;
        }

        const overview = `${h.userName} が${actionLabel}しました。`;

        // ここで diffString を判定し、Disclosure か SimpleHistoryItem か分岐
        if (h.diffString === '') {
          // 差分がないケース：SimpleHistoryItem を表示
          return (
            <div className="" key={h.id}>
              <Image src={h.avatar} width="30" height="30" alt="" />
              <p>{overview}</p>
            </div>
          );
        } else {
          // 差分があるケース：Disclosure を表示
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
