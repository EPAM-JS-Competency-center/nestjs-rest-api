import { Module } from '@nestjs/common';
import { DatabaseConfig } from './database.config';
import { adaptDynamooseOptions } from './adapters/dynamoose-options.adapter';
import { DynamooseModule } from 'nestjs-dynamoose';

const databaseConfig = new DatabaseConfig();

@Module({
  imports: [
    DynamooseModule.forRoot(adaptDynamooseOptions(databaseConfig.getConfig())),
  ],
})
export class DatabaseModule {}
