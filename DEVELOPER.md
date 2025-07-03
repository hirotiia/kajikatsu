# 🛠️ 開発者向け情報

## 概要
このプロジェクトは **カジ活** のためのモノレポで、家事の可視化と管理を行うアプリケーションです。Next.js/React を中心に構築されており、バックエンドには Supabase を利用しています。


---

## 高レベル構造
リポジトリのルートには apps/ 配下に 2 つのアプリケーションパッケージがあります:

'''
apps/
  mobile/    # Expo ネイティブアプリ
  web/       # Next.js webアプリ
'''

プロジェクト全体の設定（ESLint、TypeScript 設定、Husky フックなど）はルートに配置されています。Supabase のマイグレーションは supabase/ にあります。

主要な Web アプリケーションのソース構成は README にまとめられています:

```
src
|-- app               # ルーティング関連ファイル
|-- components        # アプリ全体で使う共有コンポーネント
|-- config            # グローバル定数
|-- features          # 各機能モジュール
|-- hooks             # グローバルで使う React hooks
|-- lib               # 共通ライブラリ (Supabase ラッパー等)
|-- stores            # グローバルステート (Redux)
|-- styles            # global.css
|-- test              # テスト
|-- types             # 共有型定義
|-- utils             # 汎用ユーティリティ
```

Supabase の設定とマイグレーションは supabase/ 以下にあります。各マイグレーションスクリプトは supabase/migrations/ にあります。

## 開始方法
Developer Guide には基本的なセットアップ手順がまとめられています:

| 項目                         | コマンド                                                       |
| ---------------------------- | -------------------------------------------------------------- |
| 依存パッケージのインストール | `npm install`                                                  |
| 開発サーバーの起動           | `npm run dev` → [http://localhost:3000](http://localhost:3000) |
| Supabase のローカル環境起動  | `npx supabase start`                                           |

同じドキュメントには役立つ開発用スクリプトも掲載されています（lint、テスト、型チェックなど）:
| コマンド              | 説明                                                                |
| --------------------- | ------------------------------------------------------------------- |
| `npm run dev`         | 開発サーバーを起動 |
| `npm run build`       | 本番ビルド |
| `npm run start`       | 本番環境でアプリを実行 |
| `npm run lint`        | ESLint による静的解析 |
| `npm run supabase`    | Supabase をローカル起動 |
| `npm run secretlint`  | 秘密情報チェック |
| `npm run check:types` | TypeScript 型チェック |
| `npm run prepare`     | Husky セットアップ |
| `npm run migrate`     | Supabase スキーマ変更出力 |


---



## 開発の基本ルール
このプロジェクトでは、コミットメッセージの先頭に絵文字プレフィックスを付けるルールがあります。よく使われるプレフィックスの一覧です:

| Emoji | タイプ | 用途の例 |
|--------|------------|------------|
| ⚡️ | `:zap:` | 既存機能の改修 |
| ✨ | `:sparkles:` | 新機能の追加 |
| 🐛 | `:bug:` | バグ修正 |
| 🔥 | `:fire:` | 不要なコードの削除 |
| ♻️ | `:recycle:` | リファクタリング |
| 📚 | `:books:` | ドキュメントの更新 |
| 💄 | `:lipstick:` | UI・スタイルの変更 |
| 🚀 | `:rocket:` | パフォーマンス改善 |
| 🛠 | `:wrench:` | 設定ファイルの変更 |
| ✅ | `:white_check_mark:` | テストの追加・修正 |
| 🚚 | `:truck:` | ファイルやフォルダの移動 |

このルールを守ることで、コミット履歴を読みやすく保つことができます。

---

## コードを読み始める場所

- apps/web/src/features – login、todos、dashboard など各機能ごとのモジュールがあります。コンポーネントと関連ロジックが1箇所にまとまっています。
- apps/web/src/lib – Supabase ラッパー (client.ts、server.ts、RPC 呼び出し) と Zod バリデーションスキーマを含みます。
- apps/web/src/stores – 通知やユーザ状態を管理する Redux スライス。
- apps/web/src/trpc – TRPC ルーターやミドルウェア、サーバー／クライアントユーティリティの定義。
- apps/web/src/components/ui – ボタンやダイアログなど再利用可能な UI コンポーネント。


---

## 新規コントリビューター向けの次のステップ


- Developer Guide のコマンドを使って 環境をセットアップ しましょう。
- 各ページ／ドメインがどのように実装されているか理解するために features ディレクトリを確認 してください。
- バックエンドとのやり取り（RPC 関数、認証ヘルパーなど）を把握するため lib/supabase を確認します。
- TRPC レイヤ (apps/web/src/trpc) を読み、API 呼び出しの仕組みを把握しましょう。
- 変更を送る際は コミットガイドライン を守ってください。


---

