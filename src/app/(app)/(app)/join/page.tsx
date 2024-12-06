export default async function JoinPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { invitation_token, expires_at } = searchParams;

  if (!invitation_token || !expires_at) {
    return <p>Invalid or missing query parameters</p>;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/post/invite-request`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        invitation_token,
        expires_at,
      }),
    },
  );

  if (!response.ok) {
    return <p>リクエストが失敗しました。</p>;
  }

  console.log(response);

  return (
    <div className="">
      <p>jkjkfajioeuf</p>
    </div>
  );
}
