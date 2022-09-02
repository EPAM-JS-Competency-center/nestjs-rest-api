import { isObject, isString } from './shared/types/types.helper';
import { ENV } from './shared/env/env.contants';

type Options = Record<string, string | boolean | number>;

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
  metaData: Options;
  serviceName: string;
  serviceVersion: string;
}

class AppConfig {
  private static instance;
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
  .setServiceName(ENV.APP_NAME)
  .setServiceVersion(ENV.npm_package_version)
  .setDatabaseOptions({
    accessKey: ENV.PUBLIC_ACCESS_KEY,
    secretKey: ENV.PRIVATE_ACCESS_KEY,
    region: ENV.REGION,
    localDatabaseEndpoint: ENV.LOCAL_DATABASE_ENDPOINT || false,
    tableAutoCreate: ENV.TABLE_AUTOCREATE === 'true',
    tableAutoUpdate: ENV.TABLE_AUTOUPDATE === 'true',
  })
  .setMetaData({ ...ENV });

export default AppConfig;
