'use client';

import { Information } from '@/components/ui/information';
import { useNotifications } from '@/components/ui/notifications';
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
      <p>{joinRequests.length}件のお知らせがあります。</p>
      {joinRequests.map((request) => (
        <Information
          key={request.id}
          username={request.users.username}
          groupName={request.group_invitations.groups.name}
          onApprove={() => handleApprove(request.id)}
          onReject={() => handleReject(request.id)}
        />
      ))}
    </div>
  );
};
