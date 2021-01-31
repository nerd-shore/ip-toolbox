import express, { RequestHandler } from 'express';

import { getAllowedOrigins } from './env';

interface Config {
  app: express.Application;
  middlewares: { forEach: (arg0: (middleWare: RequestHandler) => void) => void };
}

function init(config: Config) {
  config.app.use((req, res, next) => {
    const allowedOrigins = getAllowedOrigins().split(',');
    const origin = req.headers.origin as string;
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin); // restrict it to the required domain
    }
    res.header('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Pragma, Authorization, Host'
    );
    res.header('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    next();
  });
  config.middlewares.forEach(middleware => {
    config.app.use(middleware);
  });
}

export default {
  init,
};
