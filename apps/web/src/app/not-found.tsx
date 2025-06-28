import { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { config } from '@/config/config';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `not found｜${config.APP_NAME}`,
  };
}

export default function NotFound() {
  return (
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <Text spacing="none">404</Text>
        <Heading as="h1" className="text-center">
          お探しのページが見つかりません
        </Heading>
        <Text>
          申し訳ありません。お探しのページは存在しないか、削除された可能性があります。
        </Text>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button as="a" href="/" size="small" rounded="md">
            ホームに戻る
          </Button>
        </div>
      </div>
    </div>
  );
}
