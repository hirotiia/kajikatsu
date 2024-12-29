'use client';
import { useState, useEffect, useCallback } from 'react';

import { createClient } from '@/lib/supabase/client';
import { Tables } from '@/types/supabase/database.types';
import { addAndSortHistory, formatHistoryItem } from '@/utils/task-history';

export default function TaskHistoryPageClient({
  groupId,
}: {
  groupId: string;
}) {
  const [historyList, setHistoryList] = useState<Tables<'task_history'>[]>([]);
  const supabase = createClient();

  const fetchInitialHistory = useCallback(async () => {
    const { data, error } = await supabase
      .from('task_history')
      .select('*')
      .filter('details->old->>group_id', 'eq', groupId)
      .order('changed_at', { ascending: false });

    if (data) {
      setHistoryList(data as Tables<'task_history'>[]);
    }
    if (error) {
      console.error('Error fetching task history:', error);
    }
  }, [groupId, supabase]);

  useEffect(() => {
    // 初期ロード
    fetchInitialHistory();

    // Supabase リアルタイム購読を設定
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

    // アンマウント時に購読解除
    return () => {
      supabase.removeChannel(channel);
    };
  }, [groupId, fetchInitialHistory, supabase]);

  return (
    <div>
      <h1>Task History</h1>
      {historyList.map((item) => {
        const { displayTime, displayAction } = formatHistoryItem(item);
        console.log(displayAction);
        return (
          <div
            key={item.id}
            style={{
              border: '1px solid #ccc',
              margin: '8px 0',
              padding: '8px',
            }}
          >
            <p>{displayTime}</p>
            <p>{displayAction}</p>
            <pre style={{ whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(item.details, null, 2)}
            </pre>
          </div>
        );
      })}
    </div>
  );
}
