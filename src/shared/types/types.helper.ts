export const isString = (input: any) => typeof input === 'string';
export const isNumber = (input: any) => typeof input === 'number';
export const isObject = (input: any) =>
  typeof input === 'object' && typeof input !== 'function' && input !== null;
