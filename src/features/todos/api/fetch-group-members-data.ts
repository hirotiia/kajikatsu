import { GroupMember } from '@/lib/supabase/data/users/fetch-group-members';
import { fetchGroupMembersClient } from '@/lib/supabase/data/users/fetch-group-members-client';
import { fetchUserProfileClientRpc } from '@/stores/user';

/**
 * グループに入っているかと、グループのメンバーの配列を返却する関数
 */
export const fetchGroupMembersData = async () => {
  let joinedGroup = false;
  let groupMembers: GroupMember[] = [];

  const data = await fetchUserProfileClientRpc();

  if (!data) {
    return { error: true, data: null, joinedGroup, groupMembers };
  }

  if (data.group?.id) {
    joinedGroup = true;
    const { data: membersData } = await fetchGroupMembersClient(data.group.id);
    groupMembers = membersData?.group_members || [];
  }

  return {
    error: false,
    data,
    joinedGroup,
    groupMembers,
  };
};
