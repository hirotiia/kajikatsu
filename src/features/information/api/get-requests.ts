'use client';

import { useCallback, useEffect, useState } from 'react';

import { fetchJoinRequestsClient } from '@/lib/supabase/data/join-requests/select/fetch-join-requests-client';
import { subscribeDBChanges } from '@/lib/supabase/realtime/subscribe-db-changes';

export function useJoinRequests(userId: string) {
  const [joinRequests, setJoinRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 取得と状態更新をまとめた関数。userId 変化に応じて再生成
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const requests = await fetchJoinRequestsClient(userId);
      setJoinRequests(requests);
    } catch (e: any) {
      setError(e.message ?? 'Failed to fetch join requests');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // 初回ロード & リアルタイム購読
  useEffect(() => {
    if (!userId) return;

    loadData();

    const channel = subscribeDBChanges({
      table: 'join_requests',
      onChange: loadData,
    });

    return () => {
      channel.unsubscribe();
    };
  }, [userId, loadData]);

  return {
    joinRequests,
    isLoading,
    error,
    refreshData: loadData,
  };
}
