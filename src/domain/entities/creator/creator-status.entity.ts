import { IStatus, ITimestamps } from '../../definitions';

interface ICreatorStatusEntity extends IStatus, ITimestamps {
  id: string;
}

export { ICreatorStatusEntity };
