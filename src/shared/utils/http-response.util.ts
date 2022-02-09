import { Response } from 'express';
import { IError } from '../error';

class HttpResponse {
  /**
   * This function handles the response of the request in case of success
   * @param statusCode - HTTP success status code
   * @param response - Express response object
   * @param body - Response body  (optional)
   * @returns {Response<any, Record<string, any>>}
   */
  public static handleSuccess(
    statusCode: number,
    response: Response,
    body?: any,
  ): Response<any, Record<string, any>> {
    return response.status(statusCode).json(body);
  }

  /**
   * This function handles the response of the request in case of error
   * @param error - Error object caught by an app main function
   * @param response - Express response object
   * @returns {Response<any, Record<string, any>>}
   */
  public static handleError(
    error: any,
    response: Response,
  ): Response<any, Record<string, any>> {
    if (error instanceof IError) {
      return response.status(error.statusCode).json(error.body);
    }

    return response.status(500).json({
      message: error.message
        ? `Internal server error - ${error.message}`
        : 'Internal server error',
    });
  }
}

export { HttpResponse };
