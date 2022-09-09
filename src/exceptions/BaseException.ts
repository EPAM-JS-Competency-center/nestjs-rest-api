import { HttpStatus } from '@nestjs/common';

interface ExceptionResponse {
  statusCode: HttpStatus;
  message: string | string[];
  error: string;
}

export class BaseException extends Error {
  status = 500;
  response?: ExceptionResponse;

  constructor(...args) {
    super(...args);
  }
}
