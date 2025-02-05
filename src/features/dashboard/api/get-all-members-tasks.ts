'use client';

import { useState, useEffect, useCallback } from 'react';

import { useRealtimeTasksChannel } from '@/hooks/use-realtime-tasks-channel';

import {
  createGroupMembersTask,
  MemberWithTasks,
} from '../api/create-group-members-task';

/**
 * グループ内の「各メンバーの担当タスク一覧」を取得し、tasks テーブルに変更があれば再取得するフック
 */
export function useAllMembersTasks(groupId: string) {
  const [members, setMembers] = useState<MemberWithTasks[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // データ取得処理
  const fetchAllMembersTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await createGroupMembersTask(groupId);
      if (res.error) {
        setError(res.error);
        setMembers([]);
      } else {
        setError(null);
        setMembers(res.data?.members ?? []);
      }
    } catch (err: any) {
      setError(err?.message ?? '不明なエラー');
      setMembers([]);
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  // 初回読み込み
  useEffect(() => {
    fetchAllMembersTasks();
  }, [fetchAllMembersTasks]);

  // Realtime購読: tasks テーブルに変更があったら再取得する
  useRealtimeTasksChannel({
    table: 'tasks',
    onChange: fetchAllMembersTasks,
  });

  return {
    members,
    isLoading,
    error,
    refetch: fetchAllMembersTasks,
  };
}
