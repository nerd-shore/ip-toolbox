import express from 'express';

import xpressConfig from './config';
import { getContent, putContent } from './api/notifications';

export function startServer(app: express.Express) {
  // Runs before each requests. Used for f.i. response time monitoring.
  app.use((req, res, next) => {
    res.locals.startEpoch = Date.now();
    next();
  });

  // Middleware
  const middlewares = [express.json()];

  xpressConfig.init({ app, middlewares });

  // Routes
  app.get('/api/content/:name', getContent);
  app.put('/api/content/:name', putContent);

  return app.listen(4500, () => console.info('IP-AWE-Backend is running port 4500'));
}
