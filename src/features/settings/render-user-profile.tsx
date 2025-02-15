'use client';

import { Loader2, CircleUserRound, Pen } from 'lucide-react';
import Image from 'next/image';
import useSWR, { mutate } from 'swr';

import { uploadStorage } from '@/actions/storage/upload-storage';
import { useNotifications } from '@/components/ui/notifications';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const RenderUserProfile = () => {
  const { addNotification } = useNotifications();
  const {
    data: userData,
    error: userError,
    isLoading: isLoadingUserData,
  } = useSWR('/api/get/get-user', fetcher);

  if (userError) return <div>failed to load User data</div>;

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] || null;

    if (!file) {
      addNotification({
        type: 'error',
        status: 300,
        message: '画像がうまく読み込めませんでした。',
      });
    }

    const { message, status = 200, type } = await uploadStorage({ file });
    addNotification({ type, status, message });

    if (status === 200) {
      mutate('/api/get/get-user');
    }
  };
  return (
    <div className="grid gap-3 rounded-md bg-primary-foreground p-4">
      <div className="flex items-center gap-3">
        {isLoadingUserData ? (
          <Loader2 className="animate-spin text-primary" size={50} />
        ) : userData?.avatar_url ? (
          <Image
            src={userData.avatar_url}
            alt="ユーザーアイコン"
            width={50}
            height={50}
            className="rounded-full border border-primary-foreground"
          />
        ) : (
          <CircleUserRound className="shrink-0 text-primary" size={50} />
        )}

        {isLoadingUserData ? (
          <p className="text-lg font-bold text-primary">読み込み中です...</p>
        ) : userData?.username ? (
          <p className="text-lg font-bold text-primary">{userData?.username}</p>
        ) : (
          <p className="text-lg font-bold text-primary">未設定</p>
        )}
      </div>
      <label
        htmlFor="avatar"
        className="flex cursor-pointer gap-1 text-primary hover:underline"
      >
        <Pen size={20} />
        プロフィール画像を編集する
      </label>
      <input
        id="avatar"
        type="file"
        accept="image/*"
        name="avatar"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
