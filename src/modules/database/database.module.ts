import { Module } from '@nestjs/common';
import AppConfig from '../../app.config';
import { adaptDynamooseOptions } from './adapters/dynamoose-options.adapter';
import { DynamooseModule } from 'nestjs-dynamoose';

const databaseConfig = new AppConfig().build();

@Module({
  imports: [DynamooseModule.forRoot(adaptDynamooseOptions(databaseConfig))],
})
export class DatabaseModule {}
