'use client';

import { Notification } from '@/components/ui/notifications/notification';
import { useNotifications } from '@/components/ui/notifications/notifications-store';

export const Notifications = () => {
  const { notifications, deleteNotification } = useNotifications();

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-50 grid grid-cols-custom-layout"
    >
      <div className="col-span-2 grid grid-cols-custom-layout gap-layout-gap">
        <div className="col-start-2 inline-flex w-full flex-col items-start gap-y-3 py-4">
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
              deleteNotification={deleteNotification}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
