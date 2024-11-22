import { Info, CircleCheck, CircleAlert, CircleX } from 'lucide-react';

const icons = {
  info: <Info className="size-6 text-blue-500" aria-hidden="true" />,
  success: <CircleCheck className="size-6 text-green-500" aria-hidden="true" />,
  warning: (
    <CircleAlert className="size-6 text-yellow-500" aria-hidden="true" />
  ),
  error: <CircleX className="size-6 text-red-500" aria-hidden="true" />,
};

type NotificationProps = {
  notificationData: {
    id: string;
    type: keyof typeof icons;
    status: number;
    message?: string;
  };
  deleteNotification: (id: string) => void;
};

export const Notification = ({
  notificationData: { id, type, status, message },
  deleteNotification,
}: NotificationProps) => {
  return (
    <div className="pointer-events-auto ml-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5">
      <div className="p-4" role="alert" aria-label={message}>
        <div className="flex items-start">
          <div className="shrink-0">{icons[type]}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{status}</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
          <div className="ml-4 flex shrink-0">
            <button
              onClick={() => {
                deleteNotification(id);
              }}
              className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              <span className="sr-only">Close</span>
              <CircleX className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
