import { BaseException } from './BaseException';

export class UnauthorizedException extends BaseException {
  status = 401;
  constructor(...args) {
    super(...args);
  }
}
