import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = Object.freeze({
  PUBLIC_ACCESS_KEY: process.env.PUBLIC_ACCESS_KEY,
  PRIVATE_ACCESS_KEY: process.env.PRIVATE_ACCESS_KEY,
  REGION: process.env.REGION,
  LOCAL_DATABASE_ENDPOINT: process.env.LOCAL_DATABASE_ENDPOINT || false,
  TABLE_AUTOCREATE: process.env.TABLE_AUTOCREATE,
  TABLE_AUTOUPDATE: process.env.TABLE_AUTOUPDATE,
  APP_NAME: process.env.APP_NAME,
  APP_VERSION: process.env.npm_package_version,
});
