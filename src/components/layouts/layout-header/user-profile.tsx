'use client';
import { CircleUserRound, CircleX, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useSelector } from 'react-redux';

import { signOut } from '@/actions/auth/auth';
import { Button } from '@/components/ui/button';
import { DefinitionList } from '@/components/ui/list';
import { Popover } from '@/components/ui/popover';
import { RootState } from '@/stores/store';
import { cn } from '@/utils/cn';
import { invertOnHover } from '@/utils/invert-on-hover';

export const UserProfile = () => {
  const userState = useSelector((state: RootState) => state.user);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut();
      router.push('/login');
    });
  };

  return (
    <>
      {userState.loading ? (
        <p className="flex items-center gap-2">
          <LoaderCircle className="animate-spin" size={30}>
            読み込み中...
          </LoaderCircle>
          <span>読み込み中</span>
        </p>
      ) : userState.data ? (
        <>
          <Popover
            position="bottom"
            content={({ close }) => (
              <>
                <div className="min-w-[300px] p-3 md:max-w-[600px]">
                  <p className="mb-6 border-b-2 pb-2">
                    <b>ユーザー情報</b>
                  </p>
                  <DefinitionList
                    className="pl-1 md:pl-3"
                    spacing="sm"
                    items={[
                      {
                        term: 'グループ名',
                        definition: userState.data?.group?.name ?? '未加入',
                      },
                      {
                        term: 'ステータス',
                        definition: userState.data?.group?.role.name ?? 'なし',
                      },
                    ]}
                  />
                  <Button
                    variant="destructive"
                    onClick={handleSignOut}
                    disabled={isPending}
                    size="small"
                    className="w-full"
                    rounded="md"
                  >
                    {isPending ? 'Signing out...' : 'Sign out'}
                  </Button>
                </div>
                <button
                  onClick={close}
                  type="button"
                  className={cn(
                    'w-full rounded-b border-t-2 border-base-foreground py-2',
                    invertOnHover('bg-background', 'text-foreground'),
                  )}
                >
                  <div className="flex items-center justify-center gap-1">
                    <CircleX size={20} />
                    <span className="text-sm">閉じる</span>
                  </div>
                </button>
              </>
            )}
            className={cn(
              'flex gap-2 text-sm items-center pr-10 max-w-[200px]',
              invertOnHover('bg-background', 'text-foreground'),
            )}
            containerClassName="right-0 before:right-[10px] before:left-auto"
          >
            {userState.data?.avatar_url ? (
              <div className="shrink-0">
                <Image
                  alt=""
                  src={userState.data?.avatar_url}
                  width="30"
                  height="30"
                />
              </div>
            ) : (
              <div className="shrink-0">
                <CircleUserRound size="30">デフォルトアイコン</CircleUserRound>
              </div>
            )}
            <div className="truncate">{userState.data?.username}</div>
          </Popover>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <CircleX size={30} />
          Unknown
        </div>
      )}
    </>
  );
};
