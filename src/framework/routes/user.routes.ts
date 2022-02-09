import { CreateUserSerializer } from '@/presentation/serializers';
import { Router } from 'express';
import { createUserControllerFactory } from '../factories/controllers/create-user.controller.factory';
import { expressRouteAdapter } from '../adapters/express-route.adapter';

export default (router: Router): void => {
  router.post(
    '/users',
    expressRouteAdapter(
      createUserControllerFactory(),
      new CreateUserSerializer({}) as unknown,
    ),
  );
};
