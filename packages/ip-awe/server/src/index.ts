import express from 'express';

import { startServer } from './server';

const app = express();

export const server = startServer(app);

export default app;
