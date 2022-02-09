import {
  InputUserEntity,
  IUserEntity,
} from '@/domain/entities/user/user.entity';
import { Either } from '@/shared/either';
import { IError } from '@/shared/error';
import { IRestResponse } from '../../rest.response';

interface IInputCreateUserDto extends Omit<InputUserEntity, 'password'> {
  password?: string;
  passwordConfirmation?: string;
}

type IOutputCreateUserDto = Either<IError, IRestResponse<IUserEntity>>;

export { IInputCreateUserDto, IOutputCreateUserDto };
