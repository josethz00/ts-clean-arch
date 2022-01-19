import { IUserEntity, IUserEntityRelations } from '@/domain/entities';
import { IPagination } from '../definitions/pagination';
import { IRelation } from '../definitions/relation';
import { IWhere } from '../definitions/where';

type UserEntityKeys = keyof Omit<IUserEntity, 'password'>;

type UserEntityRelationsKeys = keyof IUserEntityRelations;

type UserUniqueWhere = keyof Pick<IUserEntity, 'id' | 'email' | 'username'>;

interface IInputUpdateUser {
  updateWhere: IWhere<UserUniqueWhere, IUserEntity[UserUniqueWhere]>;
  newData: Partial<IUserEntity>;
}

interface IInputDeleteUser {
  deleteWhere: IWhere<UserUniqueWhere, IUserEntity[UserUniqueWhere]>;
}

interface IInputFindUser {
  columns: UserEntityKeys[];
  values: IUserEntity[UserEntityKeys][];
  relations?: IRelation<UserEntityRelationsKeys>;
  pagination?: IPagination;
}

interface IUserRepository {
  findAll(pagination?: IPagination): Promise<IUserEntity[]>;
  create(inputUserEntity: Omit<IUserEntity, 'id'>): Promise<IUserEntity>;
  findBy(inputFindUser: IInputFindUser): Promise<IUserEntity[]>;
  findOneBy(inputFindUser: IInputFindUser): Promise<IUserEntity | void>;
  update(
    inputUpdateUser: IInputUpdateUser,
  ): Promise<Partial<IUserEntity> | void>;
  delete(inputDeleteUser: IInputDeleteUser): Promise<void>;
}

export {
  UserEntityKeys,
  IInputUpdateUser,
  IInputDeleteUser,
  IUserRepository,
  UserEntityRelationsKeys,
  IInputFindUser,
};
