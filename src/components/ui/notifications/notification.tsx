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
  id: string;
  type: keyof typeof icons;
  title: string;
  message?: string;
};

export const Notification = ({
  id,
  type,
  title,
  message,
}: NotificationProps) => {
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-50 flex flex-col items-end space-y-4 px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="">
        <div className="">{id}</div>
        <div className="">{icons[type]}</div>
        <div className="">{title}</div>
        <div className="">{message}</div>
      </div>
    </div>
  );
};
