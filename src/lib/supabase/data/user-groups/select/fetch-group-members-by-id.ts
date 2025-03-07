import { createClient } from '@/lib/supabase/server';

type Props = {
  groupId: string;
};

export const fetchGroupMembersById = async ({ groupId }: Props) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('user_groups')
      .select('user_id, users(username, avatar_url), roles(name)')
      .eq('group_id', groupId);

    if (error && !data) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
