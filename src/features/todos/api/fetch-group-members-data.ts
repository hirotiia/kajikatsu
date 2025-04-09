import {
  GroupMember,
  fetchGroupMembers,
} from '@/lib/supabase/data/users/fetch-group-members';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';

/**
 * グループに入っているかと、グループのメンバーの配列を返却する関数
 */
export const fetchGroupMembersData = async () => {
  let joinedGroup = false;
  let groupMembers: GroupMember[] = [];

  const data = await fetchUserData();

  if (!data) {
    return { error: true, data: null, joinedGroup, groupMembers };
  }

  if (data.group?.id) {
    joinedGroup = true;
    const { data: membersData } = await fetchGroupMembers(data.group.id);
    groupMembers = membersData?.group_members || [];
  }

  return {
    error: false,
    data,
    joinedGroup,
    groupMembers,
  };
};
