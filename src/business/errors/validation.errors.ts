import { IError } from '@/shared/error';

class ValidationErrors extends IError {
  public static default(errorMessages: string[]) {
    const validationError = new ValidationErrors({
      statusCode: 400,
      body: {
        code: 'VE-001',
        message: errorMessages,
        shortMessage: 'validationError',
      },
    });
    return validationError;
  }
}

export { ValidationErrors };
