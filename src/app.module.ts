import { Module } from '@nestjs/common';

import * as aws from 'aws-sdk';

import { CartsModule } from './handlers/carts/carts.module';
import { ConfigModule } from './services/config/config.module';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyAuthGuard } from './guards/api-key-auth.guard';
import { OrdersModule } from './handlers/orders/orders.module';

// Here you can configure a proper AWS account profile:
const credentials = new aws.SharedIniFileCredentials({
  profile: 'default',
});
aws.config.credentials = credentials;

@Module({
  imports: [CartsModule, ConfigModule, OrdersModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyAuthGuard,
    },
  ],
})
export class AppModule {}
