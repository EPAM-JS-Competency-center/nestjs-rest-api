import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseException } from '../exceptions/BaseException';
import { joinObjects } from '../shared/utils/join-objects.util';
import { USERS_EXCEPTION_STRATEGIES } from '../handlers/users/users-exception.strategies';
import { CARTS_EXCEPTION_STRATEGIES } from '../handlers/carts/carts-exception.strategies';
import { BASE_EXCEPTION_STRATEGIES } from '../shared/http/base-exception.strategies';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private exceptionsMap = joinObjects([
    USERS_EXCEPTION_STRATEGIES,
    CARTS_EXCEPTION_STRATEGIES,
    BASE_EXCEPTION_STRATEGIES,
  ]);

  private response(
    exception: BaseException,
    request: Request,
    response: Response,
  ) {
    response.status(exception.status).json({
      statusCode: exception.status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
      stack: exception.stack,
    });
  }

  catch(exception: BaseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.log('Catch starting', ctx, response, request);

    if (exception.status) {
      console.log('has status', exception.status, exception);
      return this.response(exception, request, response);
    }

    const getException = this.exceptionsMap[exception.message];
    console.log('custom error', getException);

    if (getException) {
      const exception = getException();
      console.log('in custom error handler', exception);

      return this.response(exception, request, response);
    }

    console.log('default error');

    console.log(
      JSON.stringify(exception),
      exception.message,
      exception,
      'exception',
    );

    return this.response(
      new BaseException(exception?.message),
      request,
      response,
    );
  }
}
