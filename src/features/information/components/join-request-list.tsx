'use client';

import { Button } from '@/components/ui/button';
import { useNotifications } from '@/components/ui/notifications';
import { Text } from '@/components/ui/text';
import { useJoinRequests } from '@/features/information/api/get-requests';

type JoinRequestListProps = {
  userId: string;
};

export const JoinRequestList = ({ userId }: JoinRequestListProps) => {
  const { joinRequests, isLoading, error, refreshData } =
    useJoinRequests(userId);
  const { addNotification } = useNotifications();

  const handleApprove = async (requestId: string) => {
    // APIで参加リクエストを承認
    const response = await fetch(`/api/post/approve-request`, {
      method: 'POST',
      body: JSON.stringify({ requestId }),
    });
    const json = await response.json();

    addNotification({
      type: json.type as 'success' | 'error' | 'info' | 'warning',
      status: response.status,
      message: json.message as string,
    });

    refreshData();
  };

  const handleReject = async (requestId: string) => {
    await fetch(`/api/post/reject-request`, {
      method: 'POST',
      body: JSON.stringify({ requestId }),
    });

    refreshData();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>エラーが発生しました: {error}</p>;
  }

  if (joinRequests.length === 0) {
    return <p>お知らせはありません。</p>;
  }

  return (
    <div>
      <Text>{joinRequests.length}件のお知らせがあります。</Text>
      {joinRequests.map((request) => (
        <div
          key={request.id}
          className="mt-3 flex flex-col justify-between gap-3 rounded-md border border-foreground bg-background p-4 md:flex-row md:items-center"
        >
          <Text spacing="none">
            <b>{request.users.username}</b>さんからあなたのグループ
            <b>{request.group_invitations.groups.name}</b>
            への参加リクエストが届きました！
          </Text>

          <div className="flex gap-1">
            <Button
              size="small"
              rounded="md"
              onClick={() => handleApprove(request.id)}
            >
              承認
            </Button>
            <Button
              size="small"
              rounded="md"
              variant="destructive"
              onClick={() => handleReject(request.id)}
            >
              拒否
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
