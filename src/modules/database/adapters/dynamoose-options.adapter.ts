import { DatabaseConfigModel } from '../database.config';
import { DynamooseModuleOptions } from 'nestjs-dynamoose';

export const adaptDynamooseOptions = (
  databaseConfig: DatabaseConfigModel,
): DynamooseModuleOptions => ({
  aws: {
    accessKeyId: databaseConfig.accessKey,
    secretAccessKey: databaseConfig.secretKey,
    region: databaseConfig.region,
  },
  local: databaseConfig.localDatabaseEndpoint,
  table: {
    create: databaseConfig.tableAutoCreate,
    prefix: `${databaseConfig.appName || 'Service'}-`,
    suffix: '-Table',
    update: databaseConfig.tableAutoUpdate,
  },
});
