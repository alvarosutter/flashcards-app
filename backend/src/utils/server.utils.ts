import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import globalRouter from '../routers/global.router';

function createServer() {
  const corsOpts = {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  };

  const app = express();
  // Adds a middleware to log incoming HTTP requests.
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cors(corsOpts));
  app.use('/api/v1', globalRouter);

  return app;
}

export default createServer;
