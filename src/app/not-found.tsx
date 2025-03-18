import { Metadata } from 'next';
import Link from 'next/link';

import { config } from '@/config/config';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `not found｜${config.APP_NAME}`,
  };
}

export default function NotFound() {
  return (
    <div className="">
      <p>お探しのページが見つかりません。</p>
      <Link href="/">トップページへ戻る</Link>
    </div>
  );
}
