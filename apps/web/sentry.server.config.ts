// このファイルは、サーバー側での Sentry の初期化を設定します。
// ここで追加した設定は、サーバーがリクエストを処理するたびに使用されます。
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://ad4d7de4716a75bbc610362ccd127445@o4509398321332224.ingest.us.sentry.io/4509398322577409',
  // トレースがサンプリングされる確率を定義します。
  // 本番環境ではこの値を調整するか、より詳細に制御したい場合は tracesSampler を使用してください。
  tracesSampleRate: 1,
  // このオプションを true に設定すると、Sentry のセットアップ中に有用な情報がコンソールに出力されます。
  debug: false,
});
