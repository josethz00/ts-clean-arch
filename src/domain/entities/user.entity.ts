import { ITimestamps } from '../definitions';
import { ISubscriptionEntity } from './subscriptions.entity';

interface IUserEntityRelations {
  subscriptions: ISubscriptionEntity[];
}

interface IUserEntity extends ITimestamps, Partial<IUserEntityRelations> {
  id: string;
  username: string;
  email: string;
  birthday: Date;
  password: string;
}

export { IUserEntity, IUserEntityRelations };
