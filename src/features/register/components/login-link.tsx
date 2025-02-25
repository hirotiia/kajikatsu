import Link from 'next/link';

export function LoginLink() {
  return (
    <p className="mt-6 text-primary">
      すでにアカウントを持っている方は{' '}
      <Link href="/login" className="underline hover:no-underline">
        <b>ログインページ</b>
      </Link>
      へ
    </p>
  );
}
