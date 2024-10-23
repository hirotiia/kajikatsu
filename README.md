# カジ活

カジ活は、夫婦やカップルの家事分担を可視化・共有するためのアプリです。

## 目次

- [アプリの特徴](#heading-01)
- [技術スタック](#heading-02)
- [インストール](#heading-03)
- [使い方](#heading-04)
- [ライセンス](#heading-05)
- [プロジェクトの構成](#heading-06)
- [注意](#heading-07)
- [その他ドキュメント](#heading-08)

<h2 id="heading-01">アプリの特徴</h2>

1. 家事分担の可視化

- 各家事タスクの進捗や担当者を明確にし、誰がどの家事をどれだけこなしているかを見える化します。
- グラフや進捗バーで、家事の比重や負担のバランスを直感的に把握できます。

1. ポイントシステムでの家事評価

- 各家事にポイントを設定し、ポイントシステムを用いて貢献度を数値化
- ポイントに応じてどちらがどの程度家事を負担しているかを定量的に評価できます。

1. タスク管理機能

- 家事タスクを作成し、メモ、編集、完了、削除が可能
- タスクの履歴を残すことで、過去にどの家事がどのように行われたかを確認できます。
- 日常的な家事に加えて、特定の日に発生するタスクも設定可能。

1. 家事履歴とレポート

- 週ごとや月ごとの家事分担の統計やレポートを表示。
- 誰がどの期間でどれだけ家事をこなしたかのレポートをグラフや表で確認できます。

1. ペアリング機能

- 複数のユーザー間でデータを共有できるように、招待コードを使ったペアリング機能を搭載。

1. ログイン・認証機能

- **GoogleやX（旧Twitter）**でのシンプルなログイン機能をサポート。
- 安全な認証プロセスを通じて、個人データと家事の進捗を保護。

1. データの同期と共有

- サーバーに保存されたデータは、ペアでリアルタイムに同期され、どちらのパートナーも最新の状態を把握できます。
- 一方が家事を完了すれば、もう一方に通知が届く仕組みを実装することも可能。

1. 家事負担の公平な分配をサポート

- 負担が一方に偏らないように、家事のバランスを定量的に把握し、パートナー間での公平な分担を促進します。
- お互いの家事負担を見える化することで、コミュニケーションを改善し、ストレスを軽減。

<h2 id="heading-02">技術スタック</h2>
<p style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-TailwindCSS-000000.svg?logo=tailwindcss&style=for-the-badge">
</p>

### nodeバージョン

- node v20.16.0
- npm v10.8.3

### 使用言語/フレームワーク

| 言語・フレームワーク | バージョン |
| -------------------- | ---------- |
| React.js             | 18.3.1     |
| Next.js              | 14.2.15    |
| Typescript           | 5.6.3      |
| TailwindCSS          | 3.4.14     |
| Prisma               | 5.18.0     |

| BaaS     | バージョン |
| -------- | ---------- |
| Supabase | -          |

| チャートの表示 | バージョン |
| -------------- | ---------- |
| recharts       | -          |

| CI/CD               |
| ------------------- |
| Github actions 　　 |

| デプロイ            |
| ------------------- |
| Vercel 　　　　　　 |

<h2 id="heading-03">インストール</h2>

```bash
npm i
```

開発に必要なライブラリがインストールされます。

<h2 id="heading-04">使い方</h2>

```bash
npm run dev

```

http://localhost:3000 でローカルサーバーが立ち上がります。

<h2 id="heading-05">ライセンス</h2>

チャートレ is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).

<h2 id="heading-06">プロジェクトの構成</h2>

```
src
|
+-- app               # ルーティングに関わるファイル
|
+-- components        # アプリケーション全体で使用される共有コンポーネント
|
+-- config            # グローバルに使用する定数を格納
|
+-- features          # 機能ベースのモジュール（各機能のフォルダには、その機能に特化したコードを入れ分けておく）
|
+-- hooks             # アプリケーション全体で使用される共有フック
|
+-- lib               # アプリケーション用にあらかじめ設定された再利用可能なライブラリ
|
+-- stores            # グローバルステートの管理
|
+-- styles            # global.css
|
+-- test              # テスト
|
+-- types             # アプリケーション全体で使用される共有タイプ
|
+-- utils             # 汎用的に使える関数
```

<h2 id="heading-07">注意</h2>

<ul>
<li>componentディレクトリ内でデータの取得は行わないでください。</li>
<li>できる限りページでデータの取得を行うようにし、コンポーネントはpropsを受け取るだけにとどめてください。</li>
</ul>

<h2 id="heading-08">その他ドキュメント</h2>

- [開発者向け情報](/DEVELOPER.md)
