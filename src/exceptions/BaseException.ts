export class BaseException extends Error {
  status: number = 500;
  constructor(...args) {
    super(...args);
  }
}
