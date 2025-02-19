'use client';

import { Loader2, CircleUserRound, Pen } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { uploadStorage } from '@/actions/storage/upload-storage';
import { useNotifications } from '@/components/ui/notifications';

type RenderUserProfileProps = {
  username: string;
  avatarUrl: string | null;
};

export const RenderUserProfile = ({
  username,
  avatarUrl,
}: RenderUserProfileProps) => {
  const { addNotification } = useNotifications();
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

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
      return;
    }

    setIsUploading(true);
    const { message, status = 200, type } = await uploadStorage({ file });
    addNotification({ type, status, message });

    if (status === 200) {
      router.refresh();
    }
    setIsUploading(false);
  };

  return (
    <div className="grid gap-3 rounded-md bg-background p-4">
      <div className="flex items-center gap-3">
        {isUploading ? (
          <Loader2 className="animate-spin text-foreground" size={50} />
        ) : avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="ユーザーアイコン"
            width={50}
            height={50}
            className="rounded-full border border-foreground"
          />
        ) : (
          <CircleUserRound className="shrink-0 text-foreground" size={50} />
        )}

        {isUploading ? (
          <p className="text-lg font-bold text-foreground">アップロード中...</p>
        ) : username ? (
          <p className="text-lg font-bold text-foreground">{username}</p>
        ) : (
          <p className="text-lg font-bold text-foreground">未設定</p>
        )}
      </div>
      <label
        htmlFor="avatar"
        className="flex cursor-pointer gap-1 text-foreground hover:underline"
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
