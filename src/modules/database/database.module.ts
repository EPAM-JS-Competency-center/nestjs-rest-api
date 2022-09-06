import { Module } from '@nestjs/common';
import AppConfig from '../../app.config';
import { adaptDynamooseOptions } from './adapters/dynamoose-options.adapter';
import { DynamooseModule } from 'nestjs-dynamoose';
import * as dynamoose from 'dynamoose';

const databaseConfig = new AppConfig().build();

@Module({
  imports: [DynamooseModule.forRoot(adaptDynamooseOptions(databaseConfig))],
})
export class DatabaseModule {
  constructor() {
    dynamoose.logger().then((logger) => {
      logger.providers.set(console);
    });
  }
}
