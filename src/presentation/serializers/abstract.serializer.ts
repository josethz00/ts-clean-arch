import { DecoratorTarget } from '@/business/types';
import { validate as exec } from '@/shared/validators';

abstract class AbstractSerializer<I> implements DecoratorTarget {
  public errors: string[] = [];

  /**
   * AbstractSerializer constructor
   * @param {Partial<I>} value
   */
  constructor(value: Partial<I>) {
    Object.assign(this, value);
  }

  /**
   * Validate the serializer and throw an error if there is any
   */
  public validate(): void {
    const errors = exec(this);
    if (errors.length > 0) {
      throw errors;
    }
  }
}

export { AbstractSerializer };
