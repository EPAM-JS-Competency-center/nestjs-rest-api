import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CartsModule } from './handlers/carts/carts.module';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyAuthGuard } from './guards/api-key-auth.guard';
import { UsersModule } from './handlers/users/users.module';
import { PagerMiddleware } from './middlewares/PagerMiddleware';
import { DatabaseModule } from './database/database.module';
import AppConfig from './app.config';
import { SystemModule } from './handlers/system/system.module';

const { databaseOptions } = new AppConfig().build();

@Module({
  imports: [
    CartsModule,
    UsersModule,
    DatabaseModule.forRoot({
      region: databaseOptions.region,
      secretKey: databaseOptions.secretKey,
      accessKey: databaseOptions.accessKey,
      localEndpoint: databaseOptions.localDatabaseEndpoint,
    }),
    SystemModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PagerMiddleware)
      .forRoutes({ method: RequestMethod.GET, path: '*' });
  }
}
