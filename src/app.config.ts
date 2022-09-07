import { isObject, isString } from './shared/types/types.helper';
import * as dotenv from 'dotenv';

dotenv.config();

const RAW_ENV_VARIABLES = Object.freeze({
  PUBLIC_ACCESS_KEY: process.env.PUBLIC_ACCESS_KEY,
  PRIVATE_ACCESS_KEY: process.env.PRIVATE_ACCESS_KEY,
  REGION: process.env.REGION,
  LOCAL_DATABASE_ENDPOINT: process.env.LOCAL_DATABASE_ENDPOINT,
  TABLE_AUTOCREATE: process.env.TABLE_AUTOCREATE,
  TABLE_AUTOUPDATE: process.env.TABLE_AUTOUPDATE,
  APP_NAME: process.env.APP_NAME,
  APP_VERSION: process.env.npm_package_version,
  DEVELOPMENT: process.env.DEVELOPMENT,
  PORT: process.env.PORT,
});

type MetaData = {
  port: number;
  [x: string]: string | number | boolean;
};

export interface DatabaseOptions {
  accessKey: string;
  secretKey: string;
  region?: string;
  localDatabaseEndpoint: false | string;
  tableAutoCreate: boolean;
  tableAutoUpdate: boolean;
}

export interface Config {
  databaseOptions: DatabaseOptions;
  metaData: MetaData;
  serviceName: string;
  serviceVersion: string;
}

class AppConfig {
  private static instance: AppConfig;
  private readonly config: Config;

  constructor() {
    if (isObject(AppConfig.instance)) {
      return AppConfig.instance;
    }

    this.config = {
      databaseOptions: null,
      metaData: null,
      serviceName: null,
      serviceVersion: null,
    };

    AppConfig.instance = this;

    return AppConfig.instance;
  }

  setDatabaseOptions(options: Config['databaseOptions']) {
    const instance = AppConfig.instance;

    if (isObject(instance.config.databaseOptions)) {
      throw new Error('databaseOptions must be set once');
    }

    instance.config.databaseOptions = { ...options };

    return instance;
  }

  setMetaData(options: Config['metaData']) {
    const instance = AppConfig.instance;

    if (isObject(instance.config.metaData)) {
      throw new Error('metaData must be set once');
    }

    instance.config.metaData = { ...options };

    return instance;
  }

  setServiceName(name: Config['serviceName']) {
    const instance = AppConfig.instance;

    if (isString(instance.config.serviceVersion)) {
      throw new Error('serviceName must be set once');
    }

    instance.config.serviceName = name;

    return instance;
  }

  setServiceVersion(version: Config['serviceVersion']) {
    const instance = AppConfig.instance;

    if (isString(instance.config.serviceVersion)) {
      throw new Error('serviceVersion must be set once');
    }

    instance.config.serviceVersion = version;

    return instance;
  }

  build() {
    return AppConfig.instance.config;
  }
}

new AppConfig()
  .setServiceName(RAW_ENV_VARIABLES.APP_NAME)
  .setServiceVersion(RAW_ENV_VARIABLES.APP_VERSION)
  .setDatabaseOptions({
    accessKey: RAW_ENV_VARIABLES.PUBLIC_ACCESS_KEY,
    secretKey: RAW_ENV_VARIABLES.PRIVATE_ACCESS_KEY,
    region: RAW_ENV_VARIABLES.REGION,
    localDatabaseEndpoint: RAW_ENV_VARIABLES.LOCAL_DATABASE_ENDPOINT || false,
    tableAutoCreate: RAW_ENV_VARIABLES.TABLE_AUTOCREATE === 'true',
    tableAutoUpdate: RAW_ENV_VARIABLES.TABLE_AUTOUPDATE === 'true',
  })
  .setMetaData({
    isDevelopment: RAW_ENV_VARIABLES.DEVELOPMENT === 'true',
    port: parseInt(RAW_ENV_VARIABLES.PORT) || 3000,
  });

console.info('App config', new AppConfig().build());

export default AppConfig;
