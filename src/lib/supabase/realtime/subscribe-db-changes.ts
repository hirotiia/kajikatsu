import { RealtimeChannel } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/client';

/**
 * 対象のテーブルに対するリアルタイム購読チャンネルを作成する関数。
 * @param schema - スキーマ名
 * @param table - テーブル名
 * @param filter - 例: "assignee_id=is.null,group_id=eq.<groupId>"
 * @param onChange - 変更が起こったときのコールバック
 */
type SubscribeParams = {
  schema?: string;
  table: string;
  filter?: string;
  onChange: () => void;
};

export function subscribeDBChanges({
  schema = 'public',
  table,
  filter,
  onChange,
}: SubscribeParams): RealtimeChannel {
  const supabase = createClient();
  const channelName = `${schema}:${table}${filter ? `:${filter}` : ''}`;

  const channel = supabase
    .channel(channelName)
    .on(
      'postgres_changes',
      { event: '*', schema, table, ...(filter ? { filter } : {}) },
      () => onChange(),
    )
    .subscribe();

  return channel;
}
