import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CartsModule } from './handlers/carts/carts.module';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyAuthGuard } from './guards/api-key-auth.guard';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './handlers/users/users.module';
import { PagerMiddleware } from './middlewares/PagerMiddleware';

@Module({
  imports: [CartsModule, UsersModule, DatabaseModule],
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
