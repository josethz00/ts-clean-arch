import { DecoratorResponse, DecoratorTarget } from '@/business/types';
import { addValidationRule, IValidationRule } from '../add-validation-rule';

class IsDDMMYYYYValidationRule implements IValidationRule {
  public static instance = new IsDDMMYYYYValidationRule();

  /**
   * This method is called by the decorator check if the value is a
   * valid dd/mm/yyyy date by testing the string against a regex, and
   * also converting the string to a UNIX timestamp to ensure that
   * months and days are right and that the date is not in the future.
   * @param target - The target object to be evaluated
   * @param value - The current value that will be evaluated
   * @param key - The property key that of the target object
   * @returns {string | null} - The error message if the validation fails,
   * otherwise null
   */
  public evaluate(
    target: DecoratorTarget,
    value: any,
    key: string,
  ): string | null {
    const ddmmyyyyRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (value.match(ddmmyyyyRegex) === null) {
      return `${key} is not a valid dd/mm/yyyy date`;
    }

    const [day, month, year] = value.split('/');
    const isoFormattedStr = `${year}-${month}-${day}`;

    const isoDate = new Date(isoFormattedStr);
    const dateConvertedToTimestamp = isoDate.getTime();

    if (
      typeof dateConvertedToTimestamp !== 'number' ||
      Number.isNaN(dateConvertedToTimestamp)
    ) {
      return `${key} is not a valid dd/mm/yyyy date`;
    }

    target[key] = isoFormattedStr;

    return null;
  }
}

/**
 * This is a decorator function that can be used to validate if
 * a given value is a dd/mm/yyyy string
 * @returns {DecoratorResponse}
 */
const IsDDMMYYYY = (): DecoratorResponse => {
  return (target: DecoratorTarget, propertyKey: string) => {
    addValidationRule(target, propertyKey, IsDDMMYYYYValidationRule.instance);
  };
};

export { IsDDMMYYYY };
