# 🛠️ 開発者向け情報

本ドキュメントでは、**カジ活** プロジェクトの開発環境をスムーズに構築し、効率よく開発を進めるための開発者向け情報を掲載しています。


---


## 目次

- [環境セットアップ](#heading-01)
- [技術選定について](#heading-02)
- [テーブルの追加更新について](#heading-03)
- [依存パッケージの解説](#heading-04)
- [スクリプトコマンドの説明](#heading-06)
- [開発ルール・ベストプラクティス](#heading-07)
- [⚡ Git コミットルール (Emoji Prefix)](#heading-08)
- [🔗 参考資料](#heading-09)


---


<h2 id="heading-01">📌 環境セットアップ</h2>


| 項目                         | コマンド                                                       |
| ---------------------------- | -------------------------------------------------------------- |
| 依存パッケージのインストール | `npm install`                                                  |
| 開発サーバーの起動           | `npm run dev` → [http://localhost:3000](http://localhost:3000) |
| Supabase のローカル環境起動  | `npx supabase start`                                           |



---



<h2 id="heading-02">🏗️ 技術選定について</h2>


追記予定...


---



<h2 id="heading-03">🛢️ supabaseの追加更新について</h2>


| 操作                     | コマンド例                             |
| ------------------------ | -------------------------------------- |
| ローカルで変更を行なった場合 | `supabase db diff --file [ファイル名]` |
| 例                       | `supabase db diff --file local_schema` |


---



<h2 id="heading-04">📦 依存パッケージの解説</h2>


| パッケージ名              | バージョン | 用途                               |
| ------------------------- | ---------- | ---------------------------------- |
| **next**                  | 15.1.7     | Next.js フレームワーク             |
| **react**                 | 19.0.0     | UI ライブラリ                      |
| **react-dom**             | 19.0.0     | DOM 操作用                         |
| **tailwindcss**           | 3.4.14     | CSS フレームワーク                 |
| **@reduxjs/toolkit**      | 2.5.0      | Redux 状態管理ツール               |
| **@supabase/supabase-js** | 2.45.5     | Supabase API クライアント          |
| **zod**                   | 3.24.1     | バリデーション       |

> **注**: その他の開発ツール（ESLint、Prettier、Husky など）は `devDependencies` に記載。


---



<h2 id="heading-06">🚀 スクリプトコマンドの説明</h2>


| コマンド              | 説明                                                                |
| --------------------- | ------------------------------------------------------------------- |
| `npm run dev`         | 開発サーバーを起動 ([http://localhost:3000](http://localhost:3000)) |
| `npm run build`       | 本番環境向けにアプリをビルド                                        |
| `npm run start`       | 本番環境でアプリを実行                                              |
| `npm run lint`        | ESLint を実行し、コードの静的解析                                   |
| `npm run supabase`    | ローカルで Supabase を起動                                          |
| `npm run secretlint`  | 秘密情報が含まれていないかチェック                                  |
| `npm run check-types` | TypeScript の型チェック                                             |
| `npm run prepare`     | Husky をセットアップ（Git コミット前のフックを有効化）              |
| `npm run migrate`     | Supabase のスキーマ変更を出力 (`supabase db diff`)                  |


---



<h2 id="heading-07">📌 開発ルール・ベストプラクティス</h2>


| 項目                   | ルール                                                            |
| ---------------------- | ----------------------------------------------------------------- |
| **コンポーネント設計** | 1つのコンポーネントが **1つの責務を持つ**                         |
|                        | 再利用可能な UI コンポーネントは `components/ui/` に配置          |
|                        | ビジネスロジックを含むコンポーネントは `features/` に分離         |
| **状態管理**           | グローバルな状態は `Redux` を利用            |
|                        | ローカルな状態は `useState` を使用                                |
| **環境変数の管理**     | `.env.local` にローカル環境用の変数を保存                         |
|                        | `.env.production` など、本番用の設定も明確に分ける                |
| **コード品質**         | **コミット前に `npm run lint` でコードをチェック**                  |
|                        | **コードフォーマットは `Prettier` に従う**                        |
|                        | **Git フック (`husky`) を活用して、CI/CD の品質チェックを自動化** |


---



<h2 id="heading-08">⚡ Git コミットルール (Emoji Prefix)</h2>


本プロジェクトでは、**Git コミットメッセージに Emoji Prefix** を使用しています。  
コミットの種類を明確にし、視認性を向上させるためのルールです。

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



---



<h2 id="heading-09">🔗 参考資料</h2>


<a href="https://nextjs.org/docs" target="_blank">Next.js 公式ドキュメント</a>  
<a href="https://supabase.com/docs" target="_blank">Supabase 公式ドキュメント</a>  
<a href="https://tailwindcss.com/docs" target="_blank">Tailwind CSS 公式ドキュメン</a>  

---

以上が **カジ活プロジェクトの開発環境に関する情報** です。  
不明点があれば、開発メンバー間で共有・相談してください！🚀
