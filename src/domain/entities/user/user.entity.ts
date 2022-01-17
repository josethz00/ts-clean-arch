import { ITimestamps } from '../../definitions';
import { AbstractEntity } from '../abstract.entity';
import { ISubscriptionEntity } from '../subscriptions/subscription.entity';
import { IUserStatusEntity } from './user-status.entity';

interface IUserEntityRelations {
  userSubscriptions: ISubscriptionEntity[];
  userStatus: IUserStatusEntity;
}

interface IUserEntity extends ITimestamps, Partial<IUserEntityRelations> {
  id: string;
  username: string;
  email: string;
  birthday: Date;
  password: string;
}

type InputUserEntity = Pick<
  IUserEntity,
  'username' | 'email' | 'birthday' | 'password' | 'userStatus'
>;

class UserEntity extends AbstractEntity<IUserEntity> {
  public static create(props: InputUserEntity): UserEntity {
    const currentDate = new Date();

    const user = new UserEntity({
      ...props,
      id: undefined,
      createdAt: currentDate,
      updatedAt: currentDate,
    });

    return user;
  }

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
