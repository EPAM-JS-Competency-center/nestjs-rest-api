import { Module } from '@nestjs/common';
import { CartsModule } from './handlers/carts/carts.module';

@Module({
  imports: [CartsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
