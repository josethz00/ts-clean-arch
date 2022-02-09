import { Express, Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

/**
 * This function is used to load all the routes from the routes folder
 * @param {Express} app Express app instance
 * @returns {void}
 */
const setupRoutes = (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  readdirSync(join(__dirname, '../routes')).map(async (file) => {
    if (!file.endsWith('.map')) {
      (await import(`../routes/${file}`)).default(router);
    }
  });
};

export { setupRoutes };
