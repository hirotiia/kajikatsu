// このファイルは、クライアント側での Sentry の初期化を設定します。
// ここで追加した設定は、ユーザーがブラウザでページを読み込むたびに使用されます。
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://ad4d7de4716a75bbc610362ccd127445@o4509398321332224.ingest.us.sentry.io/4509398322577409',

  // 追加機能のために、オプションのインテグレーションを追加します
  // eslint-disable-next-line import/namespace
  integrations: [Sentry.replayIntegration()],
  // トレースがサンプリングされる確率を定義します。
  // 本番環境ではこの値を調整するか、より詳細に制御したい場合は tracesSampler を使用してください。
  tracesSampleRate: 1,

  // Replay イベントがどのくらいの確率でサンプリングされるかを定義します。
  // この設定では本番環境の場合、サンプル率を 10%（10人に一人） にしています。
  replaysSessionSampleRate: 0.1,

  // エラーが発生したときに Replay イベントがどのくらいの確率でサンプリングされるかを定義します。
  replaysOnErrorSampleRate: 1.0,

  // このオプションを true に設定すると、Sentry のセットアップ中に有用な情報がコンソールに出力されます。
  debug: false,
});

// eslint-disable-next-line import/namespace
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
