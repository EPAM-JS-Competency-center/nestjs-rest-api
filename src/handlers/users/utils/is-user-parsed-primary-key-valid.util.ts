import { UserKey } from '../users.model';
import { TypesHelper } from '../../../shared/types/types.helper';

export const getIsUserParsedPrimaryKeyValid = (key: UserKey) =>
  [
    TypesHelper.isString(key.userId) && key.userId.length,
    TypesHelper.isString(key.relationKey) && key.relationKey.length,
  ].every(Boolean);
