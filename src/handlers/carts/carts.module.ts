import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { CartsRepositoryService } from './carts-repository.service';
import { UsersService } from '../users/users.service';
import { UsersRepositoryService } from '../users/users-repository.service';

@Module({
  controllers: [CartsController],
  providers: [
    CartsService,
    CartsRepositoryService,
    UsersService,
    UsersRepositoryService,
  ],
})
export class CartsModule {}
