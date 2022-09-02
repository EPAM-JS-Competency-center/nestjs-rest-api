export const getObjectFromObjectKeysUtil = <T extends object>(
  object: T,
): Record<keyof T, keyof T> => {
  return Object.keys(object).reduce((acc, current) => {
    return {
      ...acc,
      [current]: current,
    };
  }, {} as Record<keyof T, keyof T>);
};
