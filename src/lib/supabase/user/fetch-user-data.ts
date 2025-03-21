import { createClient } from '@/lib/supabase/server';
import { UserState } from '@/types/user-state.types';

// TODO: 最終的にはユーザー情報の取得はこのファイルのみにする。
/**
 * 指定したユーザーIDに基づいてユーザーデータとグループ情報を取得する。
 * userId が指定されていない場合は、現在ログイン中のユーザーIDを利用する。
 * @param userId ユーザーID(任意)
 * @returns State 型に一致するオブジェクト
 */
export async function fetchUserData(
  userId?: string,
): Promise<UserState | null> {
  try {
    const supabase = await createClient();

    if (!userId) {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error('ログインユーザー情報の取得に失敗しました:', authError);
        return null;
      }

      if (!user?.id) {
        console.error('ログインユーザーが存在しないか、IDが不明です');
        return null;
      }

      userId = user.id;
    }

    const { data: groupData, error: groupError } = await supabase
      .from('user_groups')
      .select(
        `
          users ( username, avatar_url ),
          group_id,
          groups ( name ),
          role_id,
          roles ( id, name )
        `,
      )
      .eq('user_id', userId)
      .single();

    if (groupError) {
      console.error('グループ情報の取得に失敗しました:', groupError);
    }

    if (!groupData) {
      // 追加で users テーブルを問い合わせ、個別ユーザー情報を取得
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('username, avatar_url')
        .eq('id', userId)
        .single();

      if (userError) {
        console.error('ユーザー情報の取得に失敗しました:', userError);
      }

      // usersテーブルにも該当ユーザーがいない
      if (!userData) {
        return null;
      }

      // グループ未所属ユーザーの形で返す
      return {
        username: userData.username ?? '',
        avatar_url: userData.avatar_url ?? null,
        group: null,
      };
    }

    return {
      username: groupData.users?.username ?? '',
      avatar_url: groupData.users?.avatar_url ?? null,
      group: groupData.group_id
        ? {
            id: groupData.group_id,
            name: groupData.groups?.name ?? '',
            role: {
              id: groupData.roles?.id ?? '',
              name:
                (groupData.roles?.name as 'viewer' | 'editor' | 'admin') ||
                'viewer',
            },
          }
        : null,
    };
  } catch (unexpectedError) {
    console.error(
      'ユーザー情報の取得中に予期せぬエラーが発生しました:',
      unexpectedError,
    );
    return null;
  }
}
