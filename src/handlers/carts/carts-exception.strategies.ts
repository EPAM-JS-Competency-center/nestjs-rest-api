import { NotFoundException } from '../../exceptions/NotFoundException';
import { getObjectFromObjectKeysUtil } from '../../shared/utils/get-object-from-object-keys.util';
import { BadRequestException } from '../../exceptions/BadRequestException';

export const CARTS_EXCEPTION_STRATEGIES = Object.freeze({
  CART_NOT_FOUND: () => new NotFoundException('This cart is not found'),
  SUCH_CART_ALREADY_EXIST: () =>
    new BadRequestException('Such element already exist'),
});

export const CARTS_EXCEPTION_STRATEGIES_KEYS = getObjectFromObjectKeysUtil<
  typeof CARTS_EXCEPTION_STRATEGIES
>(CARTS_EXCEPTION_STRATEGIES);
