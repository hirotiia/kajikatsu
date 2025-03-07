'use client';

import { useEffect, useState, useCallback } from 'react';

import { subscribeDBChanges } from '@/lib/supabase/realtime/subscribe-db-changes';
import { Task } from '@/types/task.types';

import { RequestMembersTasks } from '../api/create-request-members-task';

import { createRequestMembersTaskClient } from './create-request-members-task-client';

/**
 * 指定したグループIDの「未担当タスク（assignee_id が null）」を取得 & リアルタイム購読
 */
export function useRequestTasks(
  groupId: string,
  initialData: RequestMembersTasks,
) {
  const initialTasks: Task[] = initialData.members.flatMap((m) => m.tasks);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // タスク一覧を再取得する関数
  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await createRequestMembersTaskClient(groupId);
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

  useEffect(() => {
    // グループ内のタスクをリアルタイム購読
    const channel = subscribeDBChanges({
      table: 'tasks',
      filter: `group_id=eq.${groupId}`,
      onChange: () => {
        fetchTasks();
      },
    });

    // クリーンアップ
    return () => {
      channel.unsubscribe();
    };
  }, [groupId, fetchTasks]);

  return {
    tasks,
    error,
    isLoading,
  };
}
