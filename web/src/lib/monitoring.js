import * as Sentry from '@sentry/browser';

import { env } from 'claptime/lib/amplify';

export const initMonitoring = () => {
  if (env === 'prod') {
    Sentry.init({
      dsn:
        'https://010ebc47e2d544ce8364097dc9f096be@o408667.ingest.sentry.io/5279779',
    });
  }
};

export default {
  initMonitoring,
};
