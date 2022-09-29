import { BaseException } from './BaseException';

export class NotFoundException extends BaseException {
  status = 403;
}
