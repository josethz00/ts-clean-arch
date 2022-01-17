import { IUserEntity } from '@/domain/entities';
import { IRelation } from '../definitions/relation';
import { IWhere } from '../definitions/where';

export const IUserRepositoryToken = Symbol.for('IUserRepositoryToken');

export type UserEntityKeys = keyof Omit<
  IUserEntity,
  'role' | 'password' | 'created_at' | 'updated_at'
>;

export interface IInputUpdateUser {
  updateWhere: IWhere<UserEntityKeys, string | number>;
  newData: Partial<IUserEntity>;
}

export interface IInputDeleteUser {
  deleteWhere: IWhere<UserEntityKeys, string | number>;
}

export interface IUserRepository {
  findAll(): Promise<IUserEntity[]>;
  create(inputUserEntity: Omit<IUserEntity, 'id'>): Promise<IUserEntity>;
  findBy(
    type: UserEntityKeys,
    key: IUserEntity[UserEntityKeys],
    relations?: IRelation<string, UserEntityKeys>[],
  ): Promise<void | IUserEntity>;
  update(input: IInputUpdateUser): Promise<Partial<IUserEntity> | void>;
  delete(input: IInputDeleteUser): Promise<void>;
}
