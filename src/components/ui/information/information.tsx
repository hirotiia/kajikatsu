import { Button } from '../button';

type InformationProps = {
  username: string | null;
  groupName: string;
  onApprove?: () => void;
  onReject?: () => void;
};

export const Information = ({
  username,
  groupName,
  onApprove,
  onReject,
}: InformationProps) => {
  return (
    <div className="flex items-center justify-between rounded-md bg-background p-4">
      <p>
        <b>{username}</b>さんからあなたのグループ<b>{groupName}</b>
        への参加リクエストが届きました！
      </p>
      <div className="">
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
