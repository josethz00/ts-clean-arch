import { UsersErrors } from '@/business/errors';
import { IOutputCreateUserDto } from '@/business/types';
import { FindOneUserUseCase } from '@/business/usecases';
import { CreateUserUseCase } from '@/business/usecases/user/create-user.usecase';
import { CreateUserSerializer } from '@/presentation/serializers/user/create-user.serializer';
import { left, right } from '@/shared/either';
import { AbstractController } from '../abstract.controller';

class CreateUserController extends AbstractController<
  CreateUserSerializer,
  IOutputCreateUserDto
> {
  /**
   *
   * @param createUserUseCase
   * @param findOneUserUseCase
   */
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private findOneUserUseCase: FindOneUserUseCase,
  ) {
    super();
  }

  /**
   *
   * @param input
   * @returns
   */
  public async run(input: CreateUserSerializer): Promise<IOutputCreateUserDto> {
    this.exec(input);

    const isUserAlreadyRegistered = await this.findOneUserUseCase.exec({
      keys: ['email'],
      values: [input.email],
    });

    if (isUserAlreadyRegistered.isRight()) {
      return left(UsersErrors.userEmailAlreadyInUse());
    }

    const userResult = await this.createUserUseCase.exec({
      ...input,
    });

    if (userResult.isLeft()) {
      return left(userResult.value);
    }

    return right({
      payload: userResult.value.payload,
      statusCode: userResult.value.statusCode,
    });
  }
}

export { CreateUserController };
