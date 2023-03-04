import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import globalRouter from './routers/global.router';

const startServer = async () => {
  const corsOpts = {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  };

  try {
    const app = express();
    const port = Number(process.env.PORT) || 4000;

    // Adds a middleware to log incoming HTTP requests.
    app.use(morgan('dev'));
    // Adds a middleware to parse incoming requests with JSON.
    app.use(express.json());
    // Adds cors
    app.use(cors(corsOpts));
    // Adds a middleware to handle the requests.
    app.use('/api/v1', globalRouter);

    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    return server;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

startServer();

export default startServer;
