import 'server-only';

import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/lib/supabase/user/user';

export const getGroup = async () => {
  const supabase = await createClient();
  const { user } = await getUser();

  if (!user) {
    return {
      type: 'error',
      status: 'null',
      message: 'ユーザー情報が見つかりませんでした。',
    };
  }

  const { data: group, error } = await supabase
    .from('user_groups')
    .select('*')
    .eq('user_id', user.id);

  return { group, error, user };
};
