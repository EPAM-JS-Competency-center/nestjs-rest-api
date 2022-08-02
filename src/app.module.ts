import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ApiKeyAuthGuard } from './guards/api-key-auth.guard';
import { ConfigModule } from './services/config/config.module';
import { CartsModule } from './handlers/carts/carts.module';
import { ProductsModule } from './handlers/products/products.module';
import { AppController } from './app.controller';

@Module({
  imports: [CartsModule, ConfigModule, ProductsModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyAuthGuard,
    },
  ],
})
export class AppModule {}
