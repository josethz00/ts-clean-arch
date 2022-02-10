import { IRestResponse } from '@/business/types';
import jwt from 'jsonwebtoken';
import { IMiddleware } from '../middleware';

interface IInputAuthMiddleware {
  authorization: string;
}

type UserJwtPayload = {
  user?: {
    id: string;
    username: string;
    email: string;
  };
};

type IOutputAuthMiddleware = IRestResponse<
  | UserJwtPayload
  | {
      message: string;
    }
>;

class AuthMiddleware
  implements IMiddleware<IInputAuthMiddleware, IOutputAuthMiddleware>
{
  /**
   *
   * @param input
   * @returns
   */
  public async handle(
    input: IInputAuthMiddleware,
  ): Promise<IOutputAuthMiddleware> {
    const { authorization } = input;

    if (!authorization)
      return {
        statusCode: 400,
        payload: {
          message: 'Authorization header is required',
        },
      };

    const parts = authorization.split(' ');
    if (parts.length !== 2)
      return {
        statusCode: 401,
        payload: {
          message: 'Token error, expected 2 parts',
        },
      };
    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
      return {
        statusCode: 401,
        payload: { message: 'Token malformatted' },
      };

    jwt.verify(token, authConfig.secret, (err: unknown, decoded: any) => {
      if (err)
        return { statusCode: 401, payload: { message: 'Invalid token' } };

      return {
        user: {
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
        },
        statusCode: 200,
      };
    });
  }
}

export { AuthMiddleware };
