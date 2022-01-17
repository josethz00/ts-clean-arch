import {
  InputUserEntity,
  IUserEntity,
} from '@/domain/entities/user/user.entity';
import { Either } from '@/shared/either';
import { IError } from '@/shared/error';

interface IInputCreateUserDto extends InputUserEntity {
  passwordConfirmation: string;
}

type IOutputCreateUserDto = Either<IError, IUserEntity>;

export { IInputCreateUserDto, IOutputCreateUserDto };
