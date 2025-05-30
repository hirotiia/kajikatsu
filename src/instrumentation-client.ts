// このファイルは、クライアント側での Sentry の初期化を設定します。
// ここで追加した設定は、ユーザーがブラウザでページを読み込むたびに使用されます。
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const IS_PROD = process.env.NEXT_PUBLIC_ENV === 'production';

Sentry.init({
  dsn: 'https://ad4d7de4716a75bbc610362ccd127445@o4509398321332224.ingest.us.sentry.io/4509398322577409',
  // eslint-disable-next-line import/namespace
  integrations: IS_PROD ? [] : [Sentry.replayIntegration()],
  tracesSampleRate: IS_PROD ? 0.1 : 1.0,
  replaysSessionSampleRate: IS_PROD ? 0.0 : 0.1,
  replaysOnErrorSampleRate: IS_PROD ? 1.0 : 1.0,
  debug: !IS_PROD,
});

// eslint-disable-next-line import/namespace
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
