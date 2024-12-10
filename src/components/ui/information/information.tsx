type InformationProps = {
  username: string | null;
  groupName: string;
  onApprove: () => void;
  onReject: () => void;
};

export const Information = ({
  username,
  groupName,
  onApprove,
  onReject,
}: InformationProps) => {
  return (
    <div className="">
      <p>
        <strong>{username}</strong> さんがグループ <strong>{groupName}</strong>{' '}
        に参加リクエストを送信しました。
      </p>
      <div className="">
        <button onClick={onApprove} className="">
          承認
        </button>
        <button onClick={onReject} className="">
          拒否
        </button>
      </div>
    </div>
  );
};
