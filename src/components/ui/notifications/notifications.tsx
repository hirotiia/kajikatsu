import { Notification } from '@/components/ui/notifications/notification';

export const Notifications = () => {
  const notification = {
    id: '1',
    type: 'success' as const,
    title: '200: success',
    message: 'ログイン成功しました。',
  };
  const onClose = () => {
    console.log('fuga');
  };
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-50 grid grid-cols-custom-layout"
    >
      <div className="col-span-2 grid grid-cols-custom-layout gap-layout-gap">
        <div className="col-start-2 inline-flex w-full flex-col items-start gap-y-3 py-4">
          <Notification
            key={notification.id}
            notification={notification}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};
