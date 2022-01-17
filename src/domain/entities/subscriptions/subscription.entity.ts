import { ITimestamps } from '../../definitions';

interface ISubscriptionEntity extends ITimestamps {
  id: string;
  userId: string;
  creatorId: string;
}

export { ISubscriptionEntity };
