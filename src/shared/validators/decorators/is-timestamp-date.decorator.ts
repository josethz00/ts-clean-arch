import { DecoratorResponse, DecoratorTarget } from '@/business/types';

/**
 * This is a decorator function that can be used to validate if
 * a given value is a string
 * @param {number} length - length of the string
 * @returns {DecoratorResponse}
 */
const IsTimestampDate = (): DecoratorResponse => {
  return (target: DecoratorTarget, propertyKey: string) => {};
};

export { IsTimestampDate };
