import { CreateUserController } from '@/presentation/controllers';
import { createUserUseCaseFactory } from '../usecases/create-user.usecase.factory';
import { findUserByUseCaseFactory } from '../usecases/find-one-user.usecase.factory';

/**
 * Factory for CreateUserController
 * @returns {CreateUserController}
 */
const createUserControllerFactory = (): CreateUserController => {
  return new CreateUserController(
    createUserUseCaseFactory(),
    findUserByUseCaseFactory(),
  );
};

export { createUserControllerFactory };
