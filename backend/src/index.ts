import createServer from './utils/server.utils';

try {
  const port = Number(process.env.PORT) || 4000;
  const app = createServer();

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(error);
  throw error;
}
