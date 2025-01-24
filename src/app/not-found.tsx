import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="">
      <p>お探しのページが見つかりません。</p>
      <Link href="/">トップページへ戻る</Link>
    </div>
  );
}
