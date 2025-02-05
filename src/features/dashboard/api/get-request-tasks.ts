'use client';

import { useEffect, useState, useCallback } from 'react';

import { useRealtimeTasksChannel } from '@/hooks/use-realtime-tasks-channel';
import { Task } from '@/types/task.types';

import { createRequestMembersTask } from '../api/create-request-members-task';

/**
 * 指定したグループIDの「未担当タスク（assignee_id が null）」を取得 & リアルタイム購読
 */
export function useRequestTasks(groupId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // タスク一覧を再取得する関数
  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await createRequestMembersTask(groupId);
      if (res.error) {
        setError(res.error);
        setTasks([]);
      } else {
        const members = res.data?.members ?? [];
        const allTasks = members.flatMap((member) => member.tasks);
        setTasks(allTasks);
        setError(null);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useRealtimeTasksChannel({
    table: 'tasks',
    onChange: fetchTasks,
  });

  return {
    tasks,
    error,
    isLoading,
    refetch: fetchTasks,
  };
}
