'use client';
import { CircleUserRound, CircleX, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import { DefinitionList } from '@/components/ui/list';
import { Popover } from '@/components/ui/popover';
import { RootState } from '@/stores/store';
import { cn } from '@/utils/cn';
import { invertOnHover } from '@/utils/invert-on-hover';

export const UserProfile = () => {
  const userState = useSelector((state: RootState) => state.user);
  console.log(userState);

  return (
    <>
      {userState.loading ? (
        <p className="flex gap-2">
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
                  <p>
                    <b>プロフィール</b>
                  </p>
                  <DefinitionList
                    className="top-3"
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
              'flex gap-2',
              invertOnHover('bg-background', 'text-foreground'),
            )}
            containerClassName="right-0 before:right-[10px] before:left-auto"
          >
            {userState.data?.avatar_url ? (
              <Image alt="" src={userState.data?.avatar_url} />
            ) : (
              <CircleUserRound size="30">デフォルトアイコン</CircleUserRound>
            )}

            <span>{userState.data?.username}</span>
          </Popover>
        </>
      ) : (
        <div className="flex gap-2">
          <CircleX size={30} />
          Unknown
        </div>
      )}
    </>
  );
};
