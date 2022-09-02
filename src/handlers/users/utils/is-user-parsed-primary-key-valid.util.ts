import { UserKey } from '../users.model';
import { isString } from '../../../shared/types/types.helper';

type GetIsUserParsedPrimaryKeyValid = (key: UserKey) => boolean;

export const getIsUserParsedPrimaryKeyValid: GetIsUserParsedPrimaryKeyValid = ({
  userId,
  relationKey,
}) =>
  [
    isString(userId) && userId.length,
    isString(relationKey) && relationKey.length,
  ].every(Boolean);
