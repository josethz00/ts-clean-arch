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

  /**
   * UserRepository constructor
   * @param {DbSession} dbSession
   */
  constructor(dbSession: DbSession) {
    this.dbSession = dbSession;
  }

  /**
   * This method returns a list off all users in the database
   * @param pagination - optional pagination parameters
   * @returns {Promise<IUserEntity[]>}
   */
  public async findAll(pagination?: IPagination): Promise<IUserEntity[]> {
    return (await this.dbSession.user.findMany({
      ...pagination,
    })) as IUserEntity[];
  }

  /**
   * This method creates a new user in the database
   * @param {Omit<IUserEntity, 'id'>} inputUserEntity - input properties
   * needed to create the user. The `id` property will be ignored
   * @returns {Promise<IUserEntity>}
   */
  public async create(
    inputUserEntity: Omit<IUserEntity, 'id'>,
  ): Promise<IUserEntity> {
    return this.dbSession.user.create({
      data: {
        ...inputUserEntity,
      },
    });
  }

  /**
   * This method returns a list off all users in the database
   * that match the given input (filters)
   * @param inputFindUser - input properties needed to find many users
   * in the database. The properties are the `columns` its `values`,
   * the `relations` and the `pagination`
   * @returns {Promise<IUserEntity[]>}
   */
  public async findBy(inputFindUser: IInputFindUser): Promise<IUserEntity[]> {
    const { columns, values, pagination, relations } = inputFindUser;

    const whereClause = concatArraysIntoObject(columns, values);

    return this.dbSession.user.findMany({
      where: whereClause,
      include: relations,
      ...pagination,
    });
  }

  /**
   * This method returns a single user from the database based on
   * its unique `columns` with its `values`
   * @param inputFindUser - input properties needed to find a user.
   * @returns {Promise<IUserEntity | void>} - void will be returned
   * if no user is found by the given input
   */
  public async findOneBy(
    inputFindUser: IInputFindUser,
  ): Promise<IUserEntity | void> {
    const { columns, values, relations } = inputFindUser;

    const whereClause = concatArraysIntoObject(columns, values);

    const user = await this.dbSession.user.findFirst({
      where: whereClause,
      include: relations,
    });
    if (!user) {
      return;
    }
    return user;
  }

  /**
   * This method updates a user in the database
   * @param inputUpdateUser - input properties needed to update a user.
   * The properties are the `where` clause with its values and the
   * `newData` that will update the user
   * @returns {Promise<Partial<IUserEntity> | void>}
   */
  public async update(
    inputUpdateUser: IInputUpdateUser,
  ): Promise<Partial<IUserEntity> | void> {
    const { updateWhere, newData } = inputUpdateUser;

    return this.dbSession.user.update({
      where: updateWhere,
      data: newData,
    });
  }

  /**
   * This method deletes a user from the database
   * @param inputDeleteUser - input properties needed to delete a user.
   * The properties are unique `columns` with its `values`
   */
  public async delete(inputDeleteUser: IInputDeleteUser): Promise<void> {
    const { deleteWhere } = inputDeleteUser;

    await this.dbSession.user.delete({
      where: deleteWhere,
    });
  }
}

export { UserRepository };
