import { IAddress, ITimestamps } from '../../definitions';

interface ICreatorAddressEntity extends IAddress, ITimestamps {
  id: string;
}

export { ICreatorAddressEntity };
