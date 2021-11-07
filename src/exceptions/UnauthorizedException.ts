import { BaseException } from './BaseException';

export class UnauthorizedException extends BaseException {
  status: number = 401;
  constructor(...args) {
    super(...args);
  }
}
