import { IRestResponse } from '@/business/types';
import { IMiddleware } from '@/presentation';
import { Request, Response, NextFunction } from 'express';
import { IncomingHttpHeaders } from 'http';

/**
 *
 * @param middleware
 * @returns
 */
const expressMiddlewareAdapter = <
  I extends IncomingHttpHeaders,
  O extends IRestResponse,
>(
  middleware: IMiddleware<I, O>,
) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const requestProps: IncomingHttpHeaders = {
      authorization: request.headers?.authorization,
      ...(request.headers || {}),
    };
    const result = await middleware.handle(requestProps as I);
    if (result.statusCode === 200) {
      Object.assign(request, result.payload);
      next();
    } else {
      response.status(result.statusCode).json({
        error: result.payload,
      });
    }
  };
};

export { expressMiddlewareAdapter };
