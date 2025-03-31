'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createGroupSchema } from '@/lib/zod/validation-schema';
import { NotificationType } from '@/stores/notifications';

type GroupActionResponse = Omit<NotificationType, 'id'> & {
  fieldErrors?: Record<string, string[] | undefined>;
};

export const createGroup = async (
  state: any,
  formData: FormData,
): Promise<GroupActionResponse> => {
  try {
    // Zodバリデーションを実行
    const { groupName } = createGroupSchema.parse({
      groupName: formData.get('group_name'),
    });

    const userId = formData.get('user_id') as string;

    if (!userId) {
      return {
        type: 'error',
        status: 400,
        message: 'ユーザー情報の取得に失敗しました。',
      };
    }

    const supabase = await createClient();

    // グループを作成する
    const { data, error: createGroupError } = await supabase
      .from('groups')
      .insert([{ name: groupName }])
      .select();

    if (createGroupError) {
      return {
        type: 'error',
        status: 400,
        message: createGroupError.message,
      };
    }

    const groupId = data[0]?.id;

    const { data: roleData } = await supabase
      .from('roles')
      .select('id')
      .eq('name', 'owner')
      .single();

    if (!roleData?.id) {
      return {
        type: 'error',
        status: 400,
        message: '権限情報が取得できませんでした。',
      };
    }

    const { error: setDataError } = await supabase.from('user_groups').insert([
      {
        group_id: groupId,
        user_id: userId,
        role_id: roleData.id,
      },
    ]);

    if (setDataError) {
      return {
        type: 'error',
        status: 400,
        message: setDataError.message,
      };
    }

    return {
      type: 'success',
      status: 200,
      message: '新しいグループを作成しました。',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        type: 'error',
        status: 400,
        message: 'フォームのバリデーションエラー',
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    return {
      type: 'error',
      status: 500,
      message: '予期せぬエラーが発生しました。',
    };
  }
};
