import { ITimestamps } from '../../definitions';
import { AbstractEntity } from '../abstract.entity';
import { ISubscriptionEntity } from '../subscriptions/subscription.entity';
import { IUserStatusEntity } from './user-status.entity';

interface IUserEntityRelations {
  userSubscriptions: ISubscriptionEntity[];
  userStatus: IUserStatusEntity;
}

interface IUserEntity extends ITimestamps, Partial<IUserEntityRelations> {
  id?: string;
  username: string;
  email: string;
  birthday: Date;
  password: string;
  accessToken?: string | null;
}

type InputUserEntity = Pick<
  IUserEntity,
  'username' | 'email' | 'birthday' | 'password' | 'userStatus'
>;

class UserEntity extends AbstractEntity<IUserEntity> {
  /**
   * Static function to create a new UserEntity instance by
   * initializing its properties.
   * @param {InputUserEntity} props - properties to be set on the user entity
   * @returns {UserEntity}
   */
  public static create(props: InputUserEntity): UserEntity {
    const currentDate = new Date();

    const user = new UserEntity({
      ...props,
      id: undefined,
      createdAt: currentDate,
      updatedAt: currentDate,
      accessToken: null,
    });

    return user;
  }

  /**
   * Static function to update an existing UserEntity instance
   * @param {Partial<IUserEntity>} props - properties to be set on the user entity
   * @returns {UserEntity}
   */
  public static update(props: Partial<IUserEntity>): UserEntity {
    const currentDate = new Date();

    const user = new UserEntity({
      ...props,
      updatedAt: currentDate,
    } as IUserEntity);

    return user;
  }
}

export { IUserEntity, IUserEntityRelations, InputUserEntity, UserEntity };
