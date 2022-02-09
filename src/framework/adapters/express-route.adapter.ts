import { IRestResponse } from '@/business/types';
import { AbstractController } from '@/presentation/controllers';
import { Either } from '@/shared/either';
import { IError } from '@/shared/error';
import { HttpResponse } from '@/shared/utils';
import { Request, Response } from 'express';

type Input<I> = I;
type Output<O> = Either<IError, IRestResponse<O>>;

/**
 * This function works like an adapter between the controller
 * and the express router. It will instantiate the serializer
 * and the controller and then call the controller's method
 * @param {CreateUserController} controller - controller instance to be used
 */
const expressRouteAdapter = <I, O>(
  controller: AbstractController<Input<I>, Output<O>>,
  serializer: I,
) => {
  return async (request: Request, response: Response) => {
    try {
      const genericInput = Object.assign(serializer, request.body);
      const result = await controller.run(genericInput);

      if (result.isLeft()) {
        throw result.value;
      }

      return HttpResponse.handleSuccess(
        result.value.statusCode ?? 200,
        response,
        result.value.payload,
      );
    } catch (error) {
      return HttpResponse.handleError(error, response);
    }
  };
};

export { expressRouteAdapter };
