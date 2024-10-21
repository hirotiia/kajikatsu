import { Metadata } from 'next';

import { Text } from '@/components/ui/text';
import { config } from '@/config/config';

export const metadata: Metadata = {
  title: config.APP_NAME,
  description: '家事負荷分担アプリ”カジ活”のTOPページ',
};

export default function Home() {
  return (
    <>
      <hgroup className="mb-6 flex flex-col-reverse items-center justify-center gap-4 md:mb-12 md:gap-6">
        <h1 className="text-4xl md:text-6xl">{config.APP_NAME}</h1>
      </hgroup>

      <Text className="text-center">
        夫婦やカップルの家事分担を可視化・共有するためのアプリです。
      </Text>

      <div className="mt-20 grid grid-cols-custom gap-custom-gap max-w-inline-custom mx-auto">
        <article
          className="grid grid-rows-subgrid row-span-4 gap-custom-gutter bg-primary rounded-md text-primary-foreground p-4"
          aria-labelledby="article1"
        >
          <h2 id="article1" className="text-xl md:text-2xl text-center">
            機能タイトル
          </h2>
        </article>
        <article
          className="grid grid-rows-subgrid row-span-4 gap-custom-gutter bg-primary rounded-md text-primary-foreground p-4"
          aria-labelledby="article1"
        >
          <h2 id="article1" className="text-xl md:text-2xl text-center">
            機能タイトル
          </h2>
        </article>
        <article
          className="grid grid-rows-subgrid row-span-4 gap-custom-gutter bg-primary rounded-md text-primary-foreground p-4"
          aria-labelledby="article1"
        >
          <h2 id="article1" className="text-xl md:text-2xl text-center">
            機能タイトル
          </h2>
        </article>
      </div>
    </>
  );
}
