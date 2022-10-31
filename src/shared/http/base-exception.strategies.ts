import { BadRequestException } from '../../exceptions/BadRequestException';
import { getObjectFromObjectKeysUtil } from '../utils/get-object-from-object-keys.util';

export const BASE_EXCEPTION_STRATEGIES = Object.freeze({
  PROVIDED_ID_INVALID: () => new BadRequestException('Provided id is invalid'),
});

export const BASE_EXCEPTION_STRATEGIES_KEYS = getObjectFromObjectKeysUtil<
  typeof BASE_EXCEPTION_STRATEGIES
>(BASE_EXCEPTION_STRATEGIES);
