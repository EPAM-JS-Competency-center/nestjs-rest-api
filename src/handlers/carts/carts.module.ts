import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [CartsController],
  providers: [CartsService, UsersService],
})
export class CartsModule {}
