import { isObject, isString } from './shared/types/types.helper';
import * as dotenv from 'dotenv';

dotenv.config();

const RAW_ENV_VARIABLES = Object.freeze({
  ENDPOINT: process.env.ENDPOINT,
  USER: process.env.USER_NAME,
  DB_PORT: process.env.DB_PORT,
  PASSWORD: process.env.PASSWORD,
  TABLE_SCHEMA_AUTOUPDATE: process.env.TABLE_SCHEMA_AUTOUPDATE,
  APP_VERSION: process.env.npm_package_version,
  DEVELOPMENT: process.env.DEVELOPMENT,
  PORT: process.env.PORT,
  DATABASE_NAME: process.env.DATABASE_NAME,
});

type MetaData = {
  port: number;
  [x: string]: string | number | boolean;
};

export interface DatabaseOptions {
  endpoint: string;
  user: string;
  dbPort: number;
  password: string;
  tableSchemaAutoupdate: boolean;
  dbName: string;
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
  .setServiceVersion(RAW_ENV_VARIABLES.APP_VERSION)
  .setDatabaseOptions({
    user: RAW_ENV_VARIABLES.USER,
    password: RAW_ENV_VARIABLES.PASSWORD,
    endpoint: RAW_ENV_VARIABLES.ENDPOINT,
    dbPort: parseInt(RAW_ENV_VARIABLES.DB_PORT),
    tableSchemaAutoupdate: RAW_ENV_VARIABLES.TABLE_SCHEMA_AUTOUPDATE === 'true',
    dbName: RAW_ENV_VARIABLES.DATABASE_NAME,
  })
  .setMetaData({
    isDevelopment: RAW_ENV_VARIABLES.DEVELOPMENT === 'true',
    port: parseInt(RAW_ENV_VARIABLES.PORT) || 3000,
  });

console.info('App config', new AppConfig().build());

export default AppConfig;
