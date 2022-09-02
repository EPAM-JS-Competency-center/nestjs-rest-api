import { ENV } from '../../shared/env/env.contants';

export interface DatabaseConfigModel {
  accessKey: string;
  secretKey: string;
  region?: string;
  localDatabaseEndpoint: false | string;
  tableAutoCreate: boolean;
  tableAutoUpdate: boolean;
  appName?: string;
}

export class DatabaseConfig {
  private static instance;
  private readonly config: DatabaseConfigModel;

  constructor() {
    if (DatabaseConfig.instance === 'object') {
      return DatabaseConfig.instance;
    }

    this.config = {
      accessKey: ENV.PUBLIC_ACCESS_KEY,
      secretKey: ENV.PRIVATE_ACCESS_KEY,
      region: ENV.REGION,
      localDatabaseEndpoint: ENV.LOCAL_DATABASE_ENDPOINT || false,
      tableAutoCreate: ENV.TABLE_AUTOCREATE === 'true',
      tableAutoUpdate: ENV.TABLE_AUTOUPDATE === 'true',
      appName: ENV.APP_NAME,
    };

    DatabaseConfig.instance = this;

    return this;
  }

  getConfig() {
    return this.config;
  }
}
