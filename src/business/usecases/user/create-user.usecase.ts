import { IInputCreateUserDto, IOutputCreateUserDto } from '@/business/types';
import { left, right } from '@/shared/either';
import { IUserRepository } from '@/business/repositories';
import { IHasherService } from '@/business/services';
import { IAbstractUseCase } from '../abstract.usecase';
import { UserEntity } from '@/domain/entities';
import { UsersErrors } from '@/business/errors';

class CreateUserUseCase
  implements IAbstractUseCase<IInputCreateUserDto, IOutputCreateUserDto>
{
  /**
   * CreateUserUseCase constructor with dependencies injection
   * @param userRepository - user repository
   * @param hasherService - hasher service
   */
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hasherService: IHasherService,
  ) {}

  /**
   * This method creates a new user using a hasher service and a user repository
   * @param {IInputCreateUserDto} input - parameters to create a new user
   * @returns {Promise<IOutputCreateUserDto>}
   */
  public async exec(input: IInputCreateUserDto): Promise<IOutputCreateUserDto> {
    if (input.password !== input.passwordConfirmation) {
      return left(UsersErrors.userPasswordConfirmationDoesNotMatch());
    }

    const hashedPassword = await this.hasherService.create(input.password!);
    delete input.passwordConfirmation;
    delete input.password;

    const user = UserEntity.create({
      ...input,
      password: hashedPassword,
    }).exportValues();

    try {
      const userEntity = await this.userRepository.create(user);
      delete userEntity.accessToken;
      return right({
        payload: userEntity,
      });
    } catch (error) {
      console.log(error);
      return left(UsersErrors.entityCreationError());
    }
  }
}

export { CreateUserUseCase };
