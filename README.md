# はじめに

**カジ活** は、家族やパートナーが **家事の分担を見える化し、より公平に管理できる** アプリです。
「どちらがどの家事をどれくらいしているのか？」を **グラフやポイントで確認** し、
お互いの負担を可視化することで、**不公平感をなくし、協力しやすい環境を作る** ことを目的としています。

---


## 目次

- [技術スタック](#heading-01)
- [アプリの機能と説明](#heading-02)
- [プロジェクトの構成](#heading-03)
- [今後追加したい機能](#heading-04)
- [ライセンス](#heading-05)
- [Webアクセシビリティ](#heading-06)
- [その他ドキュメント](#heading-07)


---


<h2 id="heading-01">技術スタック</h2>
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
| React.js             | 19.0.0     |
| Next.js              | 15.1.7     |
| Typescript           | 5.6.3      |
| TailwindCSS          | 3.4.14     |
| Redux                | 5.0.1      |

| BaaS     | SQL        |
| -------- | ---------- |
| Supabase | PostgreSQL |

| チャートの表示 | バージョン |
| -------------- | ---------- |
| recharts       | -          |

| CI/CD               |
| ------------------- |
| Github actions 　　 |

| デプロイ            |
| ------------------- |
| Vercel 　　　　　　 |

---


<h2 id="heading-02">アプリの機能と説明</h2>

### 🏡 家事分担の可視化

✅ 各家事タスクの進捗や担当者を明確にし、**誰がどの家事をどれだけこなしているかを見える化**！


### 📝 タスク管理機能

✅ **家事タスクを作成・編集・完了・削除** できる！  
✅ タスクの履歴を残し、**過去にどの家事がどのように行われたかを確認** 可能！


### 🔗 ペアリング機能

✅ 招待リンクを使ってパートナーと簡単にペアリング！  
✅ **リアルタイムでデータを共有** し、いつでもお互いの進捗を確認！


### 🔑 ログイン・認証機能

✅ **GoogleやX（旧Twitter）** で簡単ログイン！  
✅ **安全な認証プロセス** で、個人データと家事の進捗をしっかり保護！


### 🔄 データの同期と共有

✅ **ペアでリアルタイムに同期**！どちらのパートナーも最新の状態を把握できる！


---


<h2 id="heading-03">プロジェクトの構成</h2>

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

---


<h2 id="heading-04">今後追加したい機能</h2>

- ✏️ **ユーザー名変更機能**  
  → プロフィール設定でユーザー名を自由に変更できるようにする。

- 🔑 **グループ内の権限編集機能**  
  → 管理者がメンバーの権限（編集権限・閲覧権限など）を設定できるようにする。

- 🎯 **タスクに応じたポイント機能**  
  → **家事の負担をポイント化** し、貢献度を数値で確認できるようにする。

- 📊 **チャート表示機能**  
  → 家事の進捗やバランスを **グラフやチャートで可視化** し、より分かりやすく表示。

- 📢 **家事を完了すると、もう一方に通知が届く** 仕組み。  
  → 「ありがとう」など何かしらコミュニケーションが行えるようにする。


---


<h2 id="heading-05">ライセンス</h2>

カジ活 is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).


---



<h2 id="heading-06">Webアクセシビリティについて</h2>


### 品質チェックツール


- (Nu HTML Checker)[https://validator.nu/]
- (axe)[https://a11y-guidelines.freee.co.jp/explanations/axe.html]



### アクセシビリティ最適化の参考サイト


- https://www.w3.org/WAI/ARIA/apg/

---


<h2 id="heading-07">その他ドキュメント</h2>

- [開発者向け情報](/DEVELOPER.md)
