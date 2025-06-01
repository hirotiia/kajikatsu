import * as Sentry from '@sentry/nextjs';

type ErrorContext = {
  location: string;
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
};

export function logErrorToSentry(error: unknown, context: ErrorContext): void {
  const { location, tags = {}, extra = {} } = context;

  Sentry.captureException(error, {
    tags: {
      location,
      env: process.env.NODE_ENV,
      ...tags,
    },
    extra: {
      timestamp: new Date().toISOString(),
      ...extra,
    },
  });
}
