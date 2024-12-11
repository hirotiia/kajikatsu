'use client';

import { Information } from '@/components/ui/information';
import { useJoinRequests } from '@/features/information/api/get-requests';

type JoinRequestListProps = {
  userId: string;
};

export const JoinRequestList = ({ userId }: JoinRequestListProps) => {
  const { joinRequests, isLoading, error, mutate } = useJoinRequests(userId);

  const handleApprove = async (requestId: string) => {
    // APIで参加リクエストを承認（例: /api/approve-request）
    await fetch(`/api/approve-request`, {
      method: 'POST',
      body: JSON.stringify({ requestId }),
    });
    mutate(); // キャッシュを再フェッチ
  };

  const handleReject = async (requestId: string) => {
    // APIで参加リクエストを拒否（例: /api/reject-request）
    await fetch(`/api/reject-request`, {
      method: 'POST',
      body: JSON.stringify({ requestId }),
    });
    mutate(); // キャッシュを再フェッチ
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading join requests</p>;

  return (
    <div>
      {joinRequests?.length === 0 ? (
        <p>No join requests</p>
      ) : (
        joinRequests?.map((request) => (
          <Information
            key={request.id}
            username={request.users.username}
            groupName={request.group_invitations.groups.name}
            onApprove={() => handleApprove(request.id)}
            onReject={() => handleReject(request.id)}
          />
        ))
      )}
    </div>
  );
};
