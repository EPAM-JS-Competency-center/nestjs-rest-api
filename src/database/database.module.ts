import { Module } from '@nestjs/common';
import { DatabaseCoreModule, DatabaseOptions } from './database-core.module';

@Module({})
export class DatabaseModule {
  static forRoot(options: DatabaseOptions) {
    return {
      module: DatabaseModule,
      imports: [DatabaseCoreModule.forRoot(options)],
    };
  }
}
