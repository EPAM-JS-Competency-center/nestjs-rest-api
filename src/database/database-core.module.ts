import { Global, Module } from '@nestjs/common';
import * as dynamoose from 'dynamoose';
import { DatabaseProviderValues } from './constants';
import { logger } from './utils/logger';

export interface DatabaseOptions {
  localEndpoint?: string | boolean;
  accessKey?: string;
  secretKey?: string;
  region?: string;
}

const initialization = async (options: DatabaseOptions) => {
  if (options.localEndpoint) {
    try {
      dynamoose.aws.ddb.local(options.localEndpoint as string);
    } catch (e) {
      console.error(
        `An error occurred while local connection: ${e.message || '-'}`,
      );
    }
  } else {
    try {
      const dynamoDb = new dynamoose.aws.ddb.DynamoDB({
        accessKeyId: options.accessKey,
        secretAccessKey: options.secretKey,
        region: options.region,
      } as unknown);

      dynamoose.aws.ddb.set(dynamoDb);
    } catch (e) {
      console.error(
        `An error occurred while remote connection: ${e.message || '-'}`,
      );
    }
  }

  try {
    (await dynamoose.logger()).providers.set(logger);
  } catch (e) {
    console.error(
      `An error occurred while logger setting: ${e.message || '-'}`,
    );
  }
};

@Global()
@Module({})
export class DatabaseCoreModule {
  static forRoot(options: DatabaseOptions) {
    const initialProvider = {
      provide: DatabaseProviderValues.INITIALIZATION,
      useFactory: () => initialization(options),
    };
    return {
      module: DatabaseCoreModule,
      providers: [initialProvider],
      exports: [initialProvider],
    };
  }
}
