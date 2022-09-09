import { BaseException } from './BaseException';

export class NotFoundException extends BaseException {
  status = 404;
  constructor(...args) {
    super(...args);
  }
}
