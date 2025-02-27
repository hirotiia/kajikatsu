import { cn } from '@/utils/cn';

import { Button } from '../button';

type InformationProps = {
  username: string | null;
  groupName: string;
  className: string;
  onApprove?: () => void;
  onReject?: () => void;
};

export const Information = ({
  username,
  groupName,
  className,
  onApprove,
  onReject,
}: InformationProps) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-between gap-3 rounded-md bg-background p-4 md:flex-row md:items-center',
        className,
      )}
    >
      <p>
        <b>{username}</b>さんからあなたのグループ<b>{groupName}</b>
        への参加リクエストが届きました！
      </p>
      <div className="flex gap-1">
        <Button size="small" rounded="md" onClick={onApprove}>
          承認
        </Button>
        <Button
          size="small"
          rounded="md"
          variant="destructive"
          onClick={onReject}
        >
          拒否
        </Button>
      </div>
    </div>
  );
};
