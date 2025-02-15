'use client';

import { useState, useEffect, useCallback } from 'react';

import { useRealtimeTasksChannel } from '@/hooks/use-realtime-tasks-channel';
import { createClient } from '@/lib/supabase/client';
import { fetchTasksByUserIdClient } from '@/lib/supabase/data/tasks/select/fetch-tasks-by-user-id-client';
import { Task } from '@/types/task.types';

export const useMyTasks = () => {
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  /**
   * タスク一覧を再取得するロジック
   * - 再取得の必要があれば外部からも呼べるよう useCallback 化
   */
  const fetchAllTasks = useCallback(async () => {
    setIsLoading(true);

    const userResult = await supabase.auth.getUser();
    const user = userResult.data?.user;

    if (!user) {
      setError('ユーザーが認証されていません。');
      setIsLoading(false);
      return;
    }

    const { data, error: fetchError } = await fetchTasksByUserIdClient(
      user.id,
      {
        filterType: 'assignee',
        filterValue: user.id,
      },
    );

    if (fetchError) {
      setError(fetchError);
      setIsLoading(false);
      return;
    }

    setMyTasks(data ?? []);
    setIsLoading(false);
  }, [supabase]);

  // 初回レンダリング時にタスクを取得
  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  // Realtime購読し、テーブル変更があれば再フェッチ
  useRealtimeTasksChannel({
    table: 'tasks',
    onChange: fetchAllTasks,
  });

  return {
    myTasks,
    isLoading,
    error,
  };
};
