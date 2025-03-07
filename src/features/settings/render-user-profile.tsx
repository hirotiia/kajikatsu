'use client';

import { Loader2, Pen } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uploadStorage } from '@/actions/storage/upload-storage';
import { useNotifications } from '@/components/ui/notifications';
import { UserInfo } from '@/components/ui/user';
import { RootState } from '@/stores';
import { updateAvatarUrl } from '@/stores/user/reducer';

export const RenderUserProfile = () => {
  const { addNotification } = useNotifications();
  const userState = useSelector((state: RootState) => state.user);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();

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
    try {
      const { url, status = 200, type } = await uploadStorage({ file });
      addNotification({ type, status });

      if (status === 200) {
        dispatch(updateAvatarUrl(url));
      }
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
    <div className="grid gap-3 rounded-md bg-background p-4">
      <div className="flex items-center gap-3">
        {isUploading ? (
          <Loader2 className="animate-spin text-foreground" size={50} />
        ) : (
          <UserInfo
            avatarUrl={userState.data?.avatar_url}
            username={userState.data?.username || '未設定'}
            size={50}
          />
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
