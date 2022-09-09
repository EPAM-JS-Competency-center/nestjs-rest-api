export const joinObjects = <Property = string>(
  objects: Record<string, Property>[],
) => {
  return objects.reduce((acc, current) => {
    return {
      ...acc,
      ...current,
    };
  }, {});
};
