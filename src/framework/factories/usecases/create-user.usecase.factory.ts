import { CreateUserUseCase } from '@/business/usecases';
import { UserRepository } from '@/framework/repositories';
import { HasherService } from '@/framework/services';
import { dbSessionFactory } from '../db/db-session.factory';

/**
 * Factory for CreateUserUseCase
 * @returns {CreateUserUseCase}
 */
const createUserUseCaseFactory = (): CreateUserUseCase => {
  const userRepository = new UserRepository(dbSessionFactory());
  const hasherService = new HasherService();
  return new CreateUserUseCase(userRepository, hasherService);
};

export { createUserUseCaseFactory };
