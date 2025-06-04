import { DefinitionList } from '@/components/ui/list';
import { CreateGroup } from '@/features/group/components/create-group';
import { DleteGroup } from '@/features/group/components/delete-group';
import { InviteGroup } from '@/features/group/components/invite-group';
import { createTRPCContext } from '@/trpc/init';
import { createCaller } from '@/trpc/routers/_app';

export const GroupInformation = async () => {
  const ctx = await createTRPCContext();
  const caller = createCaller(ctx);
  const user = await caller.userProfile.getUserProfile();

  if (!user) {
    throw new Error('ユーザー情報の取得に失敗しました。');
  }

  return (
    <>
      <DefinitionList
        items={[
          {
            term: 'グループ名',
            definitions: [user.group?.name ?? '未加入'],
          },
        ]}
      />
      <div className="mt-6 flex gap-3">
        {user.group ? (
          <>
            <InviteGroup userId={user.userId} groupId={user.group.id} />
            <DleteGroup
              userId={user.userId}
              groupId={user.group.id}
              roleId={user.group.role.id}
            />
          </>
        ) : (
          <>
            <CreateGroup userId={user.userId} />
          </>
        )}
      </div>
    </>
  );
};
