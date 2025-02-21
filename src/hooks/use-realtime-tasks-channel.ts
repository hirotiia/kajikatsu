'use client';

import { useEffect, useRef } from 'react';

import { createClient } from '@/lib/supabase/client';
import { subscribeDBChanges } from '@/lib/supabase/realtime/subscribe-db-changes';

type UseRealtimeTasksChannelProps = {
  schema?: string;
  table: string;
  filter?: string;
  onChange: () => void;
};

/**
 * タスクテーブルの変更を購読し、変更があったらコールバックを呼ぶカスタムフック。
 * - 内部で subscribeDBChanges() を呼び出す。
 * - Unmount 時にチャンネルを取り除く。
 */
export const useRealtimeTasksChannel = ({
  schema = 'public',
  table,
  filter,
  onChange,
}: UseRealtimeTasksChannelProps) => {
  const supabase = createClient();
  const channelRef = useRef<ReturnType<typeof subscribeDBChanges> | null>(null);

  useEffect(() => {
    const channel = subscribeDBChanges({
      schema,
      table,
      filter,
      onChange,
    });
    channelRef.current = channel;

    // クリーンアップ（コンポーネントのアンマウント時に購読解除）
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [supabase, onChange, schema, table, filter]);
};
