'use client';

import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { UserInfo } from '@/components/ui/user';
import { createClient } from '@/lib/supabase/client';

type Member = {
  user_id: string;
  username: string;
  avatar_url: string | null;
  role: string;
};

type GroupMembersProps = {
  groupId: string;
};

export function RenderGroupMembers({ groupId }: GroupMembersProps) {
  const supabase = createClient();
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('user_groups')
        .select('user_id, users(username, avatar_url), roles(name)')
        .eq('group_id', groupId);

      if (!error && data) {
        const mapped = data.map((m: any) => ({
          user_id: m.user_id,
          username: m.users?.username,
          avatar_url: m.users?.avatar_url,
          role: m.roles?.name,
        }));
        setMembers(mapped);
      }
      setIsLoading(false);
    };

    fetchMembers();

    // リアルタイム購読する場合は supabase.channel(...) or from(...).on(...) を設定
    // 例: RLSやEdge Functionsを組み合わせるなどのやり方も
    // let subscription = supabase.channel(...).on(...).subscribe()

    // クリーンアップ
    // return () => { supabase.removeChannel(subscription) }
  }, [supabase, groupId]);

  if (isLoading) {
    return (
      <LoaderCircle className="animate-spin text-primary" size={30}>
        読み込み中...
      </LoaderCircle>
    );
  }

  if (members.length === 0) {
    return <p>まだメンバーがいません</p>;
  }

  return (
    <div className="grid gap-y-3">
      {members.map((member) => (
        <UserInfo
          key={member.user_id}
          avatarUrl={member.avatar_url}
          username={member.username}
          role={member.role}
          size={35}
          className="rounded-md bg-background p-2 md:p-4"
        />
      ))}
    </div>
  );
}
