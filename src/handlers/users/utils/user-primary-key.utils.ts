import { UserKey } from '../users.model';

export const ID_DIVIDER = '_';

export const parseUserPrimaryKey = (id: string): UserKey => {
  const parsedId = id.split(ID_DIVIDER) as [string, string];

  return {
    userId: parsedId[0],
    relationKey: parsedId[1],
  };
};

export const getUserPrimaryKey = (userId: string, relationKey: string) => {
  return `${userId}${ID_DIVIDER}${relationKey}`;
};
