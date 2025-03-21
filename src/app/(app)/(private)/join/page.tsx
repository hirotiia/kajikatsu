'use client';

import { LoaderCircle } from 'lucide-react';
import useSWR from 'swr';

import { Content } from '@/components/layouts/content/content';

const fetcher = async ([url, body]: [
  string,
  { invitation_token: string; expires_at: string },
]) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json();
};

export default function JoinPage({ searchParams }: { searchParams: any }) {
  const { invitation_token, expires_at } = searchParams;

  const { data, error, isValidating } = useSWR(
    invitation_token && expires_at
      ? ['/api/post/send-request', { invitation_token, expires_at }]
      : null,
    fetcher,
  );

  return (
    <Content>
      <p>
        {isValidating ? (
          <LoaderCircle className="animate-spin text-primary" size={30}>
            読み込み中...
          </LoaderCircle>
        ) : data ? (
          data.message
        ) : (
          error.message
        )}
      </p>
    </Content>
  );
}
