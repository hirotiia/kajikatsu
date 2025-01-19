'use client';

import { useEffect, useRef } from 'react';

import { createClient } from '@/lib/supabase/client';

type UseRealtimeTasksChannelProps = {
  onChange: () => void;
};

/**
 * タスクテーブルの変更を購読し、変更があったらコールバックを呼ぶカスタムフック
 */
export const useRealtimeTasksChannel = ({
  onChange,
}: UseRealtimeTasksChannelProps) => {
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel('public:tasks')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
        },
        () => {
          // 変更があったらコールバックを呼ぶ
          onChange();
        },
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [supabase, onChange]);
};
