import { Module } from '@nestjs/common';
import { CartsModule } from './handlers/carts/carts.module';
import { ConfigModule } from './services/config/config.module';

@Module({
  imports: [CartsModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
