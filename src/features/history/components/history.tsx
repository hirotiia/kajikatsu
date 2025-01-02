'use client';

/** TODO
 * グループのメンバーの場合、グループ内の変更タスクを取得
 * グループのメンバーではない場合、自分の変更履歴を取得
 */
import { useState, useEffect, useCallback } from 'react';

import { Disclosure } from '@/components/ui/disclosure';
import { createClient } from '@/lib/supabase/client';
import { UserData } from '@/lib/supabase/data/users/get-user-data';
import { getUserDataClient } from '@/lib/supabase/data/users/get-user-data-client';
import { Tables } from '@/types/supabase/database.types';
import { extractChangedFields } from '@/utils/extract-changed-fields';
import { addAndSortHistory } from '@/utils/task-history';

type TaskHistoryPageClientProps = {
  userData: UserData;
};

export const TaskHistoryPageClient = ({
  userData,
}: TaskHistoryPageClientProps) => {
  const [historyList, setHistoryList] = useState<Tables<'task_history'>[]>([]);
  const [historyData, setHistoryData] = useState<
    {
      id: string;
      userName: string;
      avatar: string;
      diffString: string;
    }[]
  >([]);
  const supabase = createClient();

  const fetchInitialHistory = useCallback(async () => {
    // グループIDがある場合のクエリ例
    const { data, error } = await supabase
      .from('task_history')
      .select('*')
      .filter('details->old->>group_id', 'eq', userData.groupId)
      .order('changed_at', { ascending: false });

    if (data) {
      setHistoryList(data as Tables<'task_history'>[]);
    }
    if (error) {
      console.error('Error fetching task history:', error);
    }
  }, [userData.groupId, supabase]);

  // リアルタイム購読
  useEffect(() => {
    fetchInitialHistory();

    const channel = supabase
      .channel('task_history-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'task_history',
        },
        (payload) => {
          const newRow = payload.new as Tables<'task_history'>;
          setHistoryList((prev) => addAndSortHistory(prev, newRow));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userData.groupId, fetchInitialHistory, supabase]);

  useEffect(() => {
    const loadHistoryData = async () => {
      const result = await Promise.all(
        historyList.map(async (item) => {
          const user = await getUserDataClient(item.changed_by);
          const userName = user?.userName ?? 'unknown user';
          const avatar = user?.userAvatarUrl ?? '';

          const diff = extractChangedFields(item.details);
          const diffString = diff
            ? JSON.stringify(diff, null, 2)
            : 'No Changes';

          return {
            id: item.id,
            userName,
            avatar,
            diffString,
          };
        }),
      );
      setHistoryData(result);
    };

    loadHistoryData();
  }, [historyList]);

  console.log('-----------------');
  console.log(historyList);
  console.log('-----------------');
  console.log(historyData);
  console.log('-----------------');

  // UI 表示
  return (
    <div className="grid gap-y-3">
      {historyData.map((h) => (
        <Disclosure
          key={h.id}
          id={h.id}
          overview={`${h.userName} が更新しました。`}
          detail={h.diffString}
          icon={h.avatar}
        />
      ))}
    </div>
  );
};
