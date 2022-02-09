import { FindOneUserUseCase } from '@/business/usecases';
import { UserRepository } from '@/framework/repositories';
import { dbSessionFactory } from '../db/db-session.factory';

/**
 * Factory for FindOneUserUseCase
 * @returns {FindOneUserUseCase}
 */
const findUserByUseCaseFactory = (): FindOneUserUseCase => {
  const userRepository = new UserRepository(dbSessionFactory());
  return new FindOneUserUseCase(userRepository);
};

export { findUserByUseCaseFactory };
