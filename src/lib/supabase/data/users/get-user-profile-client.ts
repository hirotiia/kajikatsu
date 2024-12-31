'use client';
import { createClient } from '@/lib/supabase/client';

type UserProfile = {
  id: string;
  username: string | null;
  avatar_url: string | null;
};

// クライアント専用関数
export const getUserProfileClient = async (
  userId: string,
): Promise<UserProfile | null> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('users')
    .select('id, username, avatar_url')
    .eq('id', userId)
    .single();

  if (error || !data) {
    console.error(error);
    return null;
  }

  return {
    id: data.id,
    username: data.username,
    avatar_url: data.avatar_url,
  };
};
