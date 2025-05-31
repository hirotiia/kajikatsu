'use client';

import { Loader2, Pen } from 'lucide-react';
import { useState } from 'react';

import { uploadStorage } from '@/actions/storage/upload-storage';
import { useNotifications } from '@/components/ui/notifications';
import { UserInfo } from '@/components/ui/user';

export const RenderUserProfile = () => {
  const { addNotification } = useNotifications();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] || null;
    if (!file) {
      addNotification({
        type: 'error',
        status: 300,
        message: '画像の変更が失敗しました。',
      });
      return;
    }

    setIsUploading(true);
    try {
      const { status = 200, type } = await uploadStorage({ file });
      addNotification({ type, status });
    } catch (error: any) {
      addNotification({
        type: 'error',
        status: 500,
        message: error.message || '画像のアップロードに失敗しました。',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        {isUploading ? (
          <Loader2 className="animate-spin text-foreground" size={50} />
        ) : (
          <UserInfo avatarUrl={''} username={''} size={50} />
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
    </>
  );
};
