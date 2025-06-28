import { Metadata } from 'next';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { List } from '@/components/ui/list';
import { Text } from '@/components/ui/text';
import { config } from '@/config/config';

export const metadata: Metadata = {
  description: '家事負荷分担アプリ”カジ活”のTOPページです。',
};

export default async function Home() {
  return (
    <>
      <section>
        <Heading as="h1" align="center" className="mt-0">
          {config.APP_NAME}
        </Heading>
        <Text className="text-center" spacing="none">
          家族やペア同士で家事分担を可視化・共有するためのアプリです。
        </Text>
      </section>

      <section>
        <Heading underline align="center">
          アプリの特徴
        </Heading>
        <div className="mx-auto grid grid-cols-custom gap-custom-gap">
          <article
            className="row-span-2 grid grid-rows-subgrid rounded-md bg-primary p-4 text-primary-foreground"
            aria-labelledby="article1"
          >
            <hgroup className="grid gap-y-1 text-center md:gap-y-2">
              <span className="block text-xs md:text-sm">
                家事を簡単に管理できる
              </span>
              <Heading
                as="h3"
                underline
                align="center"
                className="my-0 md:my-0"
              >
                ペアリング機能
              </Heading>
            </hgroup>
            <Text spacing="none" textSize="sm">
              パートナーと一緒に家事を分担！
              <br />
              招待コードを使って簡単にペアリングし、二人で家事リストを共有。
              <br />
              片方が家事を完了させると、すぐに相手にも通知が届きます。
            </Text>
          </article>
          <article
            className="row-span-2 grid grid-rows-subgrid gap-custom-gutter rounded-md bg-primary p-4 text-primary-foreground"
            aria-labelledby="article2"
          >
            <hgroup className="grid gap-y-1 text-center md:gap-y-2">
              <span className="block text-xs md:text-sm">進捗状況を</span>
              <Heading
                as="h3"
                underline
                align="center"
                className="my-0 md:my-0"
              >
                グラフで可視化
              </Heading>
            </hgroup>
            <Text spacing="none" textSize="sm">
              誰がどれだけ家事をしているか一目瞭然！
              <br />
              家事の進捗や分担比率をグラフやポイントシステムで可視化し、不満の溜まりにくいバランスの取れた生活をサポートします。
            </Text>
          </article>
          <article
            className="row-span-2 grid grid-rows-subgrid gap-custom-gutter rounded-md bg-primary p-4 text-primary-foreground"
            aria-labelledby="article1"
          >
            <hgroup className="grid gap-y-1 text-center md:gap-y-2">
              <span className="block text-xs md:text-sm">詳細な</span>
              <Heading
                as="h3"
                underline
                align="center"
                className="my-0 md:my-0"
              >
                統計＆レポート機能
              </Heading>
            </hgroup>
            <Text spacing="none" textSize="sm">
              毎週・毎月の家事の貢献度を統計データで確認。
              <br />
              レポート機能で自分とパートナーの家事パフォーマンスを振り返り、未来の計画を立てるヒントに。
            </Text>
          </article>
        </div>
      </section>
      <section>
        <Heading align="center" underline>
          {config.APP_NAME}が解決したい課題
        </Heading>
        <Box>
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
        </Box>
      </section>
      <section>
        <Heading underline align="center">
          このアプリの目的
        </Heading>
        <Text>
          家事の負担が一方に偏ることによる不満やストレスを解消し、夫婦やカップルが互いに協力して家事を分担できる環境を作ることを目指しています。
        </Text>
        <Text>
          家事分担を可視化することで、お互いの貢献度を理解し、感謝の気持ちを持つきっかけを提供します。
        </Text>
        <Text>
          このアプリを通じて、いつまでも仲良く過ごせる関係をサポートします。
        </Text>
      </section>
      <section>
        <Heading underline align="center">
          対象
        </Heading>
        <Box>
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
        </Box>
      </section>
      <div className="mt-12 text-center">
        <Button as="a" rounded="md" variant="login" href="/login">
          ログインページへ
        </Button>
      </div>
    </>
  );
}
