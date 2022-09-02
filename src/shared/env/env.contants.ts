import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = Object.freeze({
  ...process.env,
});
