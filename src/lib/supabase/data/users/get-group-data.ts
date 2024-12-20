/**
 * ユーザーが所属するグループの情報とメンバー一覧を取得する関数
 *
 * グループ未所属の場合は以下のような空のレスポンスを返す。
 * {
 *   group_name: '',
 *   group_id: '',
 *   group_members: []
 * }
 *
 * @returns {Promise<Result<GroupResponse>>} グループ情報とメンバー一覧、またはエラーメッセージ
 */

import { createClient } from '@/lib/supabase/server';
import { Result } from '@/types/result.types';

import { getGroup } from '../../group/group';

export type GroupMember = {
  user_id: string;
  username: string;
  avatar_url: string;
  role: string;
};

export type GroupResponse = {
  group_name: string;
  group_id: string;
  group_members: GroupMember[];
};

export type GroupResponseResult = Result<GroupResponse>;

/**
 * ユーザーが所属するグループの情報とメンバー一覧を取得する関数
 *
 * グループ未所属の場合は以下のような空のレスポンスを返す。
 * {
 *   group_name: '',
 *   group_id: '',
 *   group_members: []
 * }
 *
 * @returns {Promise<GroupResponseResult>} グループ情報とメンバー一覧、またはエラーメッセージ
 */
export async function getGroupData(): Promise<GroupResponseResult> {
  const supabase = await createClient();

  try {
    const { group, error: groupError } = await getGroup();

    // グループ未所属または取得失敗の場合は空データを返す
    if (groupError || !group || group.length === 0) {
      throw new Error('グループ情報の取得に失敗しました');
    }

    const { group_id } = group[0];

    // 同グループのメンバー一覧取得
    const { data: groupMembersData, error: groupMembersError } = await supabase
      .from('user_groups')
      .select(
        `user_id, users(username, avatar_url), roles(name), groups(name, id)`,
      )
      .eq('group_id', group_id);

    // グループメンバーが取得できない場合も空データを返す
    if (
      groupMembersError ||
      !groupMembersData ||
      groupMembersData.length === 0
    ) {
      throw new Error('グループメンバーのデータが取得できませんでした。');
    }

    const groupName = groupMembersData[0]?.groups?.name ?? '';
    const groupId = groupMembersData[0]?.groups?.id ?? '';

    // メンバー情報整形
    const members = groupMembersData.map((member: any) => ({
      user_id: member.user_id,
      username: member.users?.username ?? '',
      avatar_url: member.users?.avatar_url ?? '',
      role: member.roles?.name ?? '',
    }));

    return {
      data: {
        group_name: groupName,
        group_id: groupId,
        group_members: members,
      },
      error: null,
    };
  } catch (error) {
    let errorMessage = '予期しないエラーが発生しました。';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      data: { group_name: '', group_id: '', group_members: [] },
      error: errorMessage,
    };
  }
}
