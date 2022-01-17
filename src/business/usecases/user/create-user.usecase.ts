import {
  IInputCreateUserDto,
  IOutputCreateUserDto,
} from '@/business/types/dtos/user/create-user.dto';
import { left, right } from '@/shared/either';
import { IUserRepository } from '@/business/repositories/user/user.repository';
import { IHasherService } from '@/business/services/hasher/hasher.service';
import { IAbstractUseCase } from '../abstract.usecase';
import { UserEntity } from '@/domain/entities/user/user.entity';
import { UsersErrors } from '@/business/errors';

class CreateUserUseCase
  implements IAbstractUseCase<IInputCreateUserDto, IOutputCreateUserDto>
{
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

    delete input.passwordConfirmation;

    const hashedPassword = await this.hasherService.create(input.password);

    const user = UserEntity.create({
      ...input,
      password: hashedPassword,
    }).exportValues();

    try {
      const userEntity = await this.userRepository.create(user);
      return right(userEntity);
    } catch (error) {
      return left(UsersErrors.entityCreationError());
    }
  }
}

export { CreateUserUseCase };
