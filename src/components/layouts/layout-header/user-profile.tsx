'use client';
import { CircleUserRound, CircleX, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import { Popover } from '@/components/ui/popover';
import { RootState } from '@/stores/store';

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
          <Popover content={'コンテンツ'}>
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
