import { createClient } from '@/lib/supabase/server';

/** 申請中のリクエスト申請があるかどうか判別する */
export const checkPendingJoinRequest = async (
  userId: string,
): Promise<boolean> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('join_requests')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'pending')
    .limit(1);

  if (error) {
    return false;
  }

  return !!data;
};
