'use client';
import { CircleUserRound, Pen } from 'lucide-react';
import Image from 'next/image';
import useSWR from 'swr';

import { uploadAvatar } from '@/actions/storage/upload-avatar';
import { Content } from '@/components/layouts/content/content';
import { Heading } from '@/components/ui/heading';
import { useNotifications } from '@/components/ui/notifications';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SettingPage() {
  const { addNotification } = useNotifications();
  const { data, error, isLoading } = useSWR('/api/get-avatar', fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

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

    const { message, status = 200, type } = await uploadAvatar({ file });
    addNotification({ type, status, message });
  };

  return (
    <Content bg="secondary">
      <Heading as="h1" className="mb-12 mt-4">
        設定
      </Heading>

      <p className="text-primary-foreground">
        アプリのカテゴリやプロフィールをカスタマイズできる設定画面です。
      </p>
      <p className="text-primary-foreground">
        使いやすいように、必要な項目を調整してください。
      </p>

      <Heading as="h2" className="mb-12 mt-10">
        プロフィール
      </Heading>

      <div className="grid gap-3">
        <div className="flex items-center gap-3">
          {data.avatar_url ? (
            <Image
              src={data.avatar_url}
              alt="ユーザーアイコン"
              width={30}
              height={30}
            />
          ) : (
            <CircleUserRound
              className="shrink-0 text-primary-foreground"
              size={50}
            />
          )}

          <p className="text-lg font-bold text-primary-foreground">中野寛也</p>
        </div>
        <label
          htmlFor="avatar"
          className="flex cursor-pointer gap-3 text-primary-foreground hover:underline"
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
    </Content>
  );
}
