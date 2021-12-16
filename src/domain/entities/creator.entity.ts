import { ITimestamps } from '../definitions';
import { ICreatorAddressEntity } from './creator-address.entity';
import { ICreatorStatusEntity } from './creator-status.entity';
import { ISubscriptionEntity } from './subscriptions.entity';

interface ICreatorEntityRelations {
  subscriptions: ISubscriptionEntity[];
  creatorAddress: ICreatorAddressEntity;
  creatorStatus: ICreatorStatusEntity;
}

interface ICreatorEntity extends ITimestamps, Partial<ICreatorEntityRelations> {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  birthday: Date;
  password: string;
}

export { ICreatorEntity, ICreatorEntityRelations };
