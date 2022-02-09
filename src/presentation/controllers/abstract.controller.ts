import { ValidationErrors } from '@/business/errors';
import { AbstractSerializer } from '../serializers/abstract.serializer';

abstract class AbstractController<I, O> {
  public abstract run(input: I, ...args: unknown[]): Promise<O>;

  protected exec(input: AbstractSerializer<I>): void {
    try {
      input.validate();
    } catch (errors) {
      if (errors instanceof Array && errors.length) {
        throw ValidationErrors.default(errors);
      }
    }
  }
}

export { AbstractController };
