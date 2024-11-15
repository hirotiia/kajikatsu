import { Notification } from '@/components/ui/notifications/notification';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <>
      <Notification
        id="1"
        type="success"
        title="200: success"
        message="ログイン成功しました。"
      />
      {children}
    </>
  );
};
