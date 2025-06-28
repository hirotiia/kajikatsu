import Link from 'next/link';

export const RegisterLink = () => {
  return (
    <p className="mt-2 text-primary">
      アカウントはお持ちですか？
      <Link href="/register" className="underline hover:no-underline">
        <b>新規アカウントを登録する</b>
      </Link>
    </p>
  );
};
