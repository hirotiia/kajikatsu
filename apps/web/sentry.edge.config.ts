// このファイルは、Sentry を Edge 機能（ミドルウェアや Edge Routes など）で使用するための初期化設定を行います。
// ここで追加した設定は、いずれかの Edge 機能が読み込まれるたびに使用されます。
// この設定は Vercel の Edge Runtime とは無関係であり、ローカル環境で実行する場合にも必要です。
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
