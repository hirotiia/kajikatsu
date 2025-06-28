import { DefinitionList } from '@/components/ui/list';
import { createTRPCContext } from '@/trpc/init';
import { createCaller } from '@/trpc/routers/_app';

export const UserProfileContent = async () => {
  const ctx = await createTRPCContext();
  const caller = createCaller(ctx);
  const user = await caller.userProfile.getUserProfile();

  if (!user) {
    return <p>ユーザー情報はありません</p>;
  }

  return (
    <>
      <p className="mb-6 border-b-2 pb-2">
        <b>ユーザー情報</b>
      </p>
      <DefinitionList
        className="pl-1 md:pl-3"
        items={[
          {
            term: 'グループ名',
            definitions: [user?.group?.name ?? '未加入'],
          },
          {
            term: 'ステータス',
            definitions: [user?.group?.role.name ?? 'なし'],
          },
        ]}
      />
    </>
  );
};
