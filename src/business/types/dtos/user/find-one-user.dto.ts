import { UserUniqueWhereKeys } from '@/business/repositories';
import { IUserEntity } from '@/domain/entities';
import { Either } from '@/shared/either';
import { IError } from '@/shared/error';

interface IInputFindOneUserDto {
  keys: UserUniqueWhereKeys[];
  values: IUserEntity[UserUniqueWhereKeys][];
}

type IOutputFindOneUserDto = Either<IError, IUserEntity>;

export { IInputFindOneUserDto, IOutputFindOneUserDto };
