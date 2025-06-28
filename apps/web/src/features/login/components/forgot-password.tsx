import Link from 'next/link';

export const ForgotPassword = () => {
  return (
    <p className="mt-6 text-primary">
      パスワードを忘れましたか？
      <Link href="/forgot-password" className="underline hover:no-underline">
        <b>パスワードをリセットする</b>
      </Link>
    </p>
  );
};
