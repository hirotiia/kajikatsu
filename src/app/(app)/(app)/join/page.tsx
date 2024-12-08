'use client';

import useSWR from 'swr';

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

export default function JoinPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { invitation_token, expires_at } = searchParams;

  const { data, error, isValidating } = useSWR(
    invitation_token && expires_at
      ? ['/api/post/invite-request', { invitation_token, expires_at }]
      : null,
    fetcher,
  );

  console.log(data, error, isValidating);

  return (
    <div className="">
      <p>jkjkfajioeuf</p>
    </div>
  );
}
