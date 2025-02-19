import { RealtimeChannel } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/client';

/**
 * 対象のテーブルに対するリアルタイム購読チャンネルを作成する関数。
 * 購読対象のスキーマとテーブル名と変更時のコールバックを引数に受け取りチャンネルを返す。
 */
type SubscribeParams = {
  schema?: string;
  table: string;
  onChange: () => void;
  filter?: string;
};

export function subscribeDBChanges({
  schema = 'public',
  table,
  onChange,
  filter,
}: SubscribeParams): RealtimeChannel {
  const supabase = createClient();
  const channelName = `${schema}:${table}`;

  const channel = supabase
    .channel(channelName)
    .on(
      'postgres_changes',
      { event: '*', schema, table, ...(filter ? { filter } : {}) },
      () => {
        onChange();
      },
    )
    .subscribe();

  return channel;
}
