import { IError } from '@/shared/error';

class UsersErrors extends IError {
  public static entityCreationError(): IError {
    const userErrors = new UsersErrors({
      statusCode: 400,
      body: {
        code: 'UE-001',
        message:
          'Error during creation of the user entity, please try again later',
        shortMessage: 'entityCreationFailed',
      },
    });
    return userErrors;
  }

  public static userEmailAlreadyInUse(): IError {
    const userErrors = new UsersErrors({
      statusCode: 409,
      body: {
        code: 'UE-002',
        message: 'This e-mail is already in use, please use another',
        shortMessage: 'entityCreationFailed',
      },
    });
    return userErrors;
  }

  public static userNotFound(): IError {
    const userErrors = new UsersErrors({
      statusCode: 404,
      body: {
        code: 'UE-003',
        message: 'User not found',
        shortMessage: 'useNotFound',
      },
    });
    return userErrors;
  }

  public static userNotLoadedCorrectly(): IError {
    const userErrors = new UsersErrors({
      statusCode: 400,
      body: {
        code: 'UE-004',
        message: 'User entity not loaded as espected',
        shortMessage: 'userNotLoadedCorrectly',
      },
    });
    return userErrors;
  }

  public static userEmailNotSent(): IError {
    const userErrors = new UsersErrors({
      statusCode: 500,
      body: {
        code: 'UE-005',
        message: 'The email could not be sent',
        shortMessage: 'userEmailNotSent',
      },
    });
    return userErrors;
  }

  public static userFailedToUpdate(): IError {
    const userErrors = new UsersErrors({
      statusCode: 500,
      body: {
        code: 'UE-006',
        message: 'Your user could not be updated',
        shortMessage: 'userFailedToUpdate',
      },
    });
    return userErrors;
  }

  public static userPasswordConfirmationDoesNotMatch(): IError {
    const userErrors = new UsersErrors({
      statusCode: 401,
      body: {
        code: 'UE-007',
        message: 'The password confirmation does not match',
        shortMessage: 'userPasswordConfirmationDoesNotMatch',
      },
    });
    return userErrors;
  }
}

export { UsersErrors };
