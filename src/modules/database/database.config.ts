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
      accessKey: process.env.PUBLIC_ACCESS_KEY,
      secretKey: process.env.PRIVATE_ACCESS_KEY,
      region: process.env.REGION,
      localDatabaseEndpoint: process.env.LOCAL_DATABASE_ENDPOINT || false,
      tableAutoCreate: process.env.TABLE_AUTOCREATE === 'true',
      tableAutoUpdate: process.env.TABLE_AUTOUPDATE === 'true',
      appName: process.env.APP_NAME,
    };

    DatabaseConfig.instance = this;

    return this;
  }

  getConfig() {
    return this.config;
  }
}
