import { Button } from '@/components/ui/button';
import { HeadingLv2 } from '@/components/ui/heading';
import { List } from '@/components/ui/list';
import { Text } from '@/components/ui/text';
import { config } from '@/config/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: config.APP_NAME,
  description: '家事負荷分担アプリ”カジ活”',
};

export default function Home() {
  return (
    <>
      <hgroup className="mb-14 flex flex-col-reverse items-center justify-center gap-4 md:mb-24 md:gap-6">
        <h1 className="text-4xl md:text-6xl">{config.APP_NAME}</h1>
        <p className="text-xl md:text-2xl">~家事負荷分散アプリ~</p>
      </hgroup>

      <HeadingLv2 className="mt-0">{config.APP_NAME}とは？</HeadingLv2>

      <Text className="mt-10 pl-4">
        カジ活は、夫婦やカップルの家事分担を可視化・共有するためのアプリです。
      </Text>

      <HeadingLv2 className="mt-24">
        {config.APP_NAME}が解決したい課題
      </HeadingLv2>

      <List
        listItems={[
          {
            text: '家事分担の不公・家事分担の不公平による不満やストレスの解消平による不満やストレスの解消',
          },
          {
            text: '「やった・やってない」問題の解消',
          },
          {
            text: 'お互いの貢献度の把握と感謝の促進',
          },
        ]}
      />

      <HeadingLv2>このアプリの目的</HeadingLv2>

      <Text>
        家事の負担が一方に偏ることによる不満やストレスを解消し、夫婦やカップルが互いに協力して家事を分担できる環境を作ることを目指しています。
        <br />
        家事分担を可視化することで、お互いの貢献度を理解し、感謝の気持ちを持つきっかけを提供します。
        <br />
        このアプリを通じて、いつまでも仲良く過ごせる関係をサポートします。
      </Text>

      <HeadingLv2>対象</HeadingLv2>

      <List
        listItems={[
          {
            text: '家事の負担が一方に偏っていると感じており、それを解消したいと考えている方々。',
          },
          {
            text: 'お互いの家事への貢献度を見える化して、バランスの取れた分担を目指す人々。',
          },
          {
            text: '家事の記録を通じて、相手の努力を正しく認識し、感謝の気持ちを高めたい人々。',
          },
          {
            text: '良好な関係を長く維持するための基盤を作りたい人々',
          },
          {
            text: '家事タスクを整理し、計画的に進めたい人々。',
          },
        ]}
      />

      <HeadingLv2 className="text-center">ログインして始める</HeadingLv2>
      <div className="mt-10 text-center">
        <Button as="a" rounded="md" variant="login" href="/login">
          ログインページへ
        </Button>
      </div>
    </>
  );
}
