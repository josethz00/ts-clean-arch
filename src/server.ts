import { setupApp } from './framework/express';

/**
 * This function is to start the express application
 */
const runServer = async (): Promise<void> => {
  const app = await setupApp();
  app.listen(8080, () =>
    console.log('Server is running at http://localhost:8080'),
  );
};

runServer();
