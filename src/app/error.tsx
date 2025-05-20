'use client';

import { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { config } from '@/config/config';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `エラー｜${config.APP_NAME}`,
  };
}

export default function Error({ error }: { error: Error }) {
  return (
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <Text spacing="none">500</Text>
        <Heading as="h1" className="text-center">
          予期しないエラーが発生しました
        </Heading>
        <Text>申し訳ありません。ページの表示中に問題が発生しました。</Text>
        <Text>詳細：{error.message}</Text>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button as="a" href="/" size="small" rounded="md">
            ホームに戻る
          </Button>
        </div>
      </div>
    </div>
  );
}
