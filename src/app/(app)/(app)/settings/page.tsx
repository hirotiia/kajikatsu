import { CircleUserRound, Pen } from 'lucide-react';
import { useState } from 'react';

// import { uploadAvatar } from '@/actions/storage/upload-avatar';
import { Content } from '@/components/layouts/content/content';
import { Heading } from '@/components/ui/heading';
import { useNotifications } from '@/components/ui/notifications';

export default function SettingPage() {
  const [file, setFile] = useState<File | null>(null);
  const { addNotification } = useNotifications();
  const userId = '12345';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }

    try {
      console.log(file);
      console.log(userId);
    } catch (error: any) {
      addNotification({ type: 'error', status: 300, message: error.message });
    }
  };

  return (
    <Content bg="secondary">
      <Heading as="h1" className="mb-12 mt-4">
        設定
      </Heading>

      <p>アプリのカテゴリやプロフィールをカスタマイズできる設定画面です。</p>
      <p>使いやすいように、必要な項目を調整してください。</p>

      <div className="mt-20 flex gap-3">
        <div className="">
          <CircleUserRound className="shrink-0" size={50} />
        </div>
        <p>中野寛也</p>
      </div>

      <label
        htmlFor="avatar"
        className="flex cursor-pointer gap-3 hover:underline"
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
    </Content>
  );
}
