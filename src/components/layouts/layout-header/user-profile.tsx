'use client';
import { CircleUserRound, CircleX, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import { Dialog } from '@/components/ui/dialog';
import { useOpener } from '@/hooks/use-opener';
import { RootState } from '@/stores/store';

export const UserProfile = () => {
  const openerDialog = useOpener();
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
          <button
            type="button"
            onClick={openerDialog.open}
            aria-controls="dialog-profile"
            aria-expanded={openerDialog.isOpen}
            className="flex items-center gap-2"
          >
            {userState.data?.avatar_url ? (
              <Image alt="" src={userState.data?.avatar_url} />
            ) : (
              <CircleUserRound size="30">デフォルトアイコン</CircleUserRound>
            )}

            <span>{userState.data?.username}</span>
          </button>
          <Dialog
            opener={openerDialog}
            title="プロフィール"
            id="dialog-profile"
          >
            コンテンツ
          </Dialog>
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
