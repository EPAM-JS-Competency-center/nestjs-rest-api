export class BaseException extends Error {
  status = 500;
  constructor(...args) {
    super(...args);
  }
}
