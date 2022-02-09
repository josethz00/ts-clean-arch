import express, { Express } from 'express';
import { setupRoutes } from '.';

/**
 * This function is used to load all the resources required to run
 * the express application. Eg.: middlewares, routes, extra configs etc.
 * @returns {Express}
 */
const setupApp = async (): Promise<Express> => {
  const app = express();
  app.use(express.json());
  setupRoutes(app);
  return app;
};

export { setupApp };
