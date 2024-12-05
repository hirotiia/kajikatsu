'use server';

import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/lib/supabase/user/user';

export const createGroup = async (
  state: any,
  formData: FormData,
): Promise<any | null> => {
  const supabase = await createClient();
  const { user, authError } = await getUser();
  const insertData = {
    name: formData.get('group') as string,
  };

  if (authError) {
    return {
      type: 'error',
      status: authError.code,
      message: authError.message,
    };
  }

  // すでに何かしらのグループに入っているか確認する
  const user_id = user?.id;
  if (!user_id) {
    return {
      type: 'error',
      status: 'error',
      message: 'ユーザー情報の取得に失敗しました。',
    };
  }
  const { count, error } = await supabase
    .from('user_groups')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user_id);

  if (error) {
    return {
      type: 'error',
      status: error.code,
      message: error.message,
    };
  }

  if (count && count > 0) {
    return {
      type: 'warning',
      status: '警告',
      message: 'すでにグループに入っています。',
    };
  }

  // グループを作成する
  const { data, error: createGroupError } = await supabase
    .from('groups')
    .insert([insertData])
    .select();

  if (createGroupError) {
    return {
      type: 'error',
      status: createGroupError.code,
      message: createGroupError.message,
    };
  }

  const group_id = data[0]?.id;

  const { error: invitationError } = await supabase
    .from('group_invitations')
    .insert([
      {
        group_id,
        created_by: user_id,
        expires_at: null,
      },
    ]);

  if (invitationError) {
    return {
      type: 'error',
      status: invitationError.code,
      message: invitationError.message,
    };
  }

  const { data: roleData, error: roleError } = await supabase
    .from('roles')
    .select('id')
    .eq('name', 'owner')
    .single();

  if (roleError) {
    return {
      type: 'error',
      status: roleError.code,
      message: roleError.message,
    };
  }
  const role_id = roleData.id;

  const insertRelationData = {
    user_id,
    group_id,
    role_id,
  };

  const { error: setDataError } = await supabase
    .from('user_groups')
    .insert([insertRelationData]);

  if (setDataError) {
    return {
      type: 'error',
      status: setDataError.code,
      message: setDataError.message,
    };
  }

  return {
    type: 'success',
    status: 200,
    message: '新しいグループを作成しました。',
  };
};
