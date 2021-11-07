import { BaseException } from './BaseException';

export class NotFoundException extends BaseException {
  status: number = 403;
  constructor(...args) {
    super(...args);
  }
}
