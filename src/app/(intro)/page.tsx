import { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import { HeadingLv2 } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { config } from '@/config/config';

export const metadata: Metadata = {
  title: config.APP_NAME,
  description: '家事負荷分担アプリ”カジ活”のTOPページ',
};

export default function Home() {
  return (
    <>
      <hgroup className="mb-4 flex flex-col-reverse items-center justify-center gap-4 md:mb-6 md:gap-6">
        <h1 className="text-4xl md:text-6xl">{config.APP_NAME}</h1>
      </hgroup>

      <Text className="mt-0 text-center">
        夫婦やカップルの家事分担を可視化・共有するためのアプリです。
        <br />
        以下のような機能があります。
      </Text>

      <div className="mx-auto mt-10 grid grid-cols-custom gap-custom-gap md:mt-12">
        <article
          className="row-span-2 grid grid-rows-subgrid gap-custom-gutter rounded-md bg-primary p-4 text-primary-foreground"
          aria-labelledby="article1"
        >
          <h2 id="article1" className="grid gap-y-2 text-center">
            <span className="block text-sm">家事を簡単に管理できる</span>
            <span className="block text-xl md:text-2xl">ペアリング機能</span>
          </h2>
          <p>
            パートナーと一緒に家事を分担！
            <br />
            招待コードを使って簡単にペアリングし、二人で家事リストを共有。
            <br />
            片方が家事を完了させると、すぐに相手にも通知が届きます。
          </p>
        </article>
        <article
          className="row-span-2 grid grid-rows-subgrid gap-custom-gutter rounded-md bg-primary p-4 text-primary-foreground"
          aria-labelledby="article2"
        >
          <h2 id="article2" className="grid gap-y-2 text-center">
            <span className="block text-sm">進捗状況を</span>
            <span className="block text-xl md:text-2xl">グラフで可視化</span>
          </h2>
          <p>
            誰がどれだけ家事をしているか一目瞭然！
            <br />
            家事の進捗や分担比率をグラフやポイントシステムで可視化し、不満の溜まりにくいバランスの取れた生活をサポートします。
          </p>
        </article>
        <article
          className="row-span-2 grid grid-rows-subgrid gap-custom-gutter rounded-md bg-primary p-4 text-primary-foreground"
          aria-labelledby="article1"
        >
          <h2 id="article1" className="grid gap-y-2 text-center">
            <span className="block text-sm">詳細な</span>
            <span className="block text-xl md:text-2xl">
              統計＆レポート機能
            </span>
          </h2>
          <p>
            毎週・毎月の家事の貢献度を統計データで確認。
            <br />
            レポート機能で自分とパートナーの家事パフォーマンスを振り返り、未来の計画を立てるヒントに。
          </p>
        </article>
      </div>
      <HeadingLv2 className="text-center">ログインして始める</HeadingLv2>
      <div className="mt-10 text-center">
        <Button as="a" rounded="md" variant="login" href="/login">
          ログインページへ
        </Button>
      </div>
    </>
  );
}
