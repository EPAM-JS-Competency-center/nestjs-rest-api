import { BaseException } from './BaseException';

export class BadRequestException extends BaseException {
  status = 400;
  constructor(...args) {
    super(...args);
  }
}
