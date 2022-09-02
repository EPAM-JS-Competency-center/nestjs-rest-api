import { Config } from '../../../app.config';
import { DynamooseModuleOptions } from 'nestjs-dynamoose';

export const adaptDynamooseOptions = (
  config: Config,
): DynamooseModuleOptions => {
  const { databaseOptions, serviceName } = config;

  return {
    aws: {
      accessKeyId: databaseOptions.accessKey,
      secretAccessKey: databaseOptions.secretKey,
      region: databaseOptions.region,
    },
    local: databaseOptions.localDatabaseEndpoint,
    table: {
      create: databaseOptions.tableAutoCreate,
      prefix: `${serviceName || 'Service'}-`,
      suffix: '-Table',
      update: databaseOptions.tableAutoUpdate,
    },
  };
};
