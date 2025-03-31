import { Metadata } from 'next';

import { Content } from '@/components/layouts/content/content';
import { config } from '@/config/config';
import { requestGroupMember } from '@/lib/supabase/action/request-group-member';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `リクエスト申請｜${config.APP_NAME}`,
  };
}

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ invitation_token: string; expires_at: string }>;
}) {
  const resolvedParams = await searchParams;
  const invitationToken = resolvedParams.invitation_token;
  const expiresAt = resolvedParams.expires_at;

  if (!invitationToken || !expiresAt) {
    return (
      <Content>
        <p>
          無効な招待リンクです。招待トークンまたは有効期限が見つかりません。
        </p>
      </Content>
    );
  }
  const userData = await fetchUserData();

  if (!userData) {
    return (
      <Content>
        <p>ユーザー情報が取得できませんでした。</p>
      </Content>
    );
  }

  if (userData?.group) {
    return (
      <Content>
        <p>すでにグループに入っています。</p>
        <p>
          グループに入り直したい場合は、一度所属しているグループを抜ける必要があります。
        </p>
      </Content>
    );
  }

  const isExpired = checkIfExpired(expiresAt);
  if (isExpired) {
    return (
      <Content>
        <p>
          招待リンクの有効期限が切れています。新しい招待リンクを発行してください。
        </p>
      </Content>
    );
  }

  const resultMessage = await requestGroupMember({
    token: invitationToken,
    userId: userData?.userId,
  });

  return (
    <Content>
      <p>{resultMessage}</p>
    </Content>
  );
}

// 有効期限チェック
const checkIfExpired = (expiresAt: string): boolean => {
  const expirationDate = new Date(expiresAt);
  const currentDate = new Date();

  return currentDate > expirationDate;
};
