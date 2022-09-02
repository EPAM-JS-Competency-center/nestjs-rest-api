import { NotFoundException } from '../../exceptions/NotFoundException';
import { getObjectFromObjectKeysUtil } from '../../shared/utils/get-object-from-object-keys.util';

export const USERS_EXCEPTION_STRATEGIES = Object.freeze({
  USER_NOT_FOUND: () => new NotFoundException('This user is not found'),
});

export const USERS_EXCEPTION_STRATEGIES_KEYS = getObjectFromObjectKeysUtil<
  typeof USERS_EXCEPTION_STRATEGIES
>(USERS_EXCEPTION_STRATEGIES);
