import { UserInfo } from '@/components/ui/user';
import { fetchGroupMembersById } from '@/lib/supabase/data/user-groups/select/fetch-group-members-by-id';

type Member = {
  user_id: string;
  username: string;
  avatar_url: string | null;
  role: string | null;
};

type GroupMembersProps = {
  groupId: string;
};

export const RenderGroupMembers = async ({ groupId }: GroupMembersProps) => {
  const data = await fetchGroupMembersById({ groupId });

  if (!data) {
    return <p>グループメンバーはいません。</p>;
  }

  const mappedMembers: Member[] = data.map((m) => ({
    user_id: m.user_id,
    username: m.users?.username ?? 'Unknown',
    avatar_url: m.users?.avatar_url ?? null,
    role: m.roles?.name ?? null,
  }));

  return (
    <div className="grid gap-y-3">
      {mappedMembers.map(({ user_id, avatar_url, username, role }: Member) => (
        <UserInfo
          key={user_id}
          avatarUrl={avatar_url}
          username={username}
          role={role}
          size={35}
          className="rounded-md bg-background p-2 md:p-4"
        />
      ))}
    </div>
  );
};
