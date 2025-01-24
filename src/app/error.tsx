'use client';

import Link from 'next/link';

export default function Error({ error }: { error: Error }) {
  return (
    <div>
      <p>{error.message}</p>
      <Link href="/">TOPページへ戻る</Link>
    </div>
  );
}
