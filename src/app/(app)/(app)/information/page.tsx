'use client';

import { useEffect, useState } from 'react';

import { Information } from '@/components/ui/information';
import { createClient } from '@/lib/supabase/client';

type Information = {
  username: string | null;
  groupName: string;
  groupId: string;
  userId: string;
};

const getOwnerRoleId = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('roles')
    .select('id')
    .eq('name', 'owner')
    .single();

  if (error) {
    console.error('Error fetching owner role ID:', error);
    return null;
  }

  return data.id;
};

export default function InformationPage() {
  const supabase = createClient();
  const [informations, setInformation] = useState<Information[]>([]);
  useEffect(() => {
    const channel = supabase
      .channel('join-requests-cahnnel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'join_requests',
        },
        async (payload) => {
          // 追加されたリクエストのデータを取得
          const newRequest = payload.new;
          const { user_id, invitation_id } = newRequest;
          // 監視対象のテーブルへのアクションがINSERTの場合、ユーザーを確認して同じグループ内の権限が`owner`だった場合、通知を送る
          try {
            // 参加リクエストのグループを特定
            const { data: invitationData, error: invitationError } =
              await supabase
                .from('group_invitations')
                .select('group_id')
                .eq('id', invitation_id)
                .single();

            if (invitationError || !invitationData) {
              console.error(
                'Error fetching group information:',
                invitationError,
              );
              return;
            }

            const groupId = invitationData.group_id;
            const role_id = await getOwnerRoleId();

            // グループ内の`owner`権限を持つユーザー一覧を取得
            if (typeof role_id === 'string') {
              const { data: owners, error: ownerError } = await supabase
                .from('user_groups')
                .select('user_id')
                .eq('group_id', groupId)
                .eq('role_id', role_id);

              if (ownerError || !owners || owners.length === 0) {
                console.error('Error fetching group owners:', ownerError);
                return;
              }
            }

            // 参加リクエストユーザーの情報を取得
            const { data: userData } = await supabase
              .from('users')
              .select('username')
              .eq('id', user_id)
              .single();

            // グループ名を取得
            const { data: groupData } = await supabase
              .from('groups')
              .select('name')
              .eq('id', groupId)
              .single();

            if (userData && groupData) {
              // 通知を追加
              setInformation((prev) => [
                ...prev,
                {
                  username: userData.username,
                  groupName: groupData.name,
                  groupId,
                  userId: user_id,
                },
              ]);
            }

            // 各`owner`に対して、通知用のコンポーネントを作成。表示するものは誰（username）からグループへの参加リクエストが来ています。承認しますか？
            // for (const owner of owners) {
            // }
          } catch (error) {
            console.error('Error processing join request notification:', error);
          }
        },
      )
      .subscribe();
    return () => {
      // 購読解除
      channel.unsubscribe();
    };
  }, [supabase]);

  // 参加を承認する場合
  const handleApprove = async (groupId: string, userId: string) => {
    try {
      await supabase
        .from('join_requests')
        .update({
          status: 'approved',
          processed_at: new Date().toISOString(),
        })
        .eq('group_id', groupId)
        .eq('user_id', userId);
      alert('リクエストを承認しました。');
      setInformation((prev) =>
        prev.filter((notification) => notification.userId !== userId),
      );
    } catch (error) {
      console.error('リクエストの承認処理でエラーが発生しました：', error);
    }
  };

  // 参加を拒否する場合
  const handleReject = async (groupId: string, userId: string) => {
    try {
      await supabase
        .from('join_requests')
        .update({
          status: 'rejected',
          processed_at: new Date().toISOString(),
        })
        .eq('group_id', groupId)
        .eq('user_id', userId);
      alert('リクエストを拒否しました。');
      setInformation((prev) =>
        prev.filter((notification) => notification.userId !== userId),
      );
    } catch (error) {
      console.error('リクエストの承認処理でエラーが発生しました：', error);
    }
  };
  return (
    <div>
      {informations.length > 0 ? (
        informations.map((information, index) => (
          <Information
            key={index}
            username={information.username ?? null}
            groupName={information.groupName}
            onApprove={() =>
              handleApprove(information.groupId, information.userId)
            }
            onReject={() =>
              handleReject(information.groupId, information.userId)
            }
          />
        ))
      ) : (
        <p>お知らせはありません。</p>
      )}
    </div>
  );
}
