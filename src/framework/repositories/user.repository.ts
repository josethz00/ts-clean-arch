import {
  IUserRepository,
  IPagination,
  IInputFindUser,
  IInputUpdateUser,
  IInputDeleteUser,
} from '@/business/repositories';
import { IUserEntity } from '@/domain/entities';
import { concatArraysIntoObject } from '@/shared/utils';
import { DbSession } from '../prisma';

class UserRepository implements IUserRepository {
  private readonly dbSession: DbSession;

  constructor(dbSession: DbSession) {
    this.dbSession = dbSession;
  }

  public async findAll(pagination?: IPagination): Promise<IUserEntity[]> {
    return this.dbSession.user.findMany({ ...pagination });
  }

  public async create(
    inputUserEntity: Omit<IUserEntity, 'id'>,
  ): Promise<IUserEntity> {
    return this.dbSession.user.create({
      data: {
        ...inputUserEntity,
      },
    });
  }

  public async findBy(inputFindUser: IInputFindUser): Promise<IUserEntity[]> {
    const { columns, values, pagination, relations } = inputFindUser;

    const whereClause = concatArraysIntoObject(columns, values);

    return this.dbSession.user.findMany({
      where: whereClause,
      include: relations,
      ...pagination,
    });
  }

  public async findOneBy(
    inputFindUser: IInputFindUser,
  ): Promise<IUserEntity | void> {
    const { columns, values, relations } = inputFindUser;

    const whereClause = concatArraysIntoObject(columns, values);

    return this.dbSession.user.findFirst({
      where: whereClause,
      include: relations,
    });
  }

  public async update(
    inputUpdateUser: IInputUpdateUser,
  ): Promise<Partial<IUserEntity> | void> {
    const { updateWhere, newData } = inputUpdateUser;

    return this.dbSession.user.update({
      where: updateWhere,
      data: newData,
    });
  }

  public async delete(inputDeleteUser: IInputDeleteUser): Promise<void> {
    const { deleteWhere } = inputDeleteUser;

    await this.dbSession.user.delete({
      where: deleteWhere,
    });
  }
}

export { UserRepository };
