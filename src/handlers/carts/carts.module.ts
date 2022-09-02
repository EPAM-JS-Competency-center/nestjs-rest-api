import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { CartsRepositoryService } from './carts-repository.service';
import { UsersService } from '../users/users.service';
import { UserSchemaModule } from '../users/users.schema';

@Module({
  imports: [UserSchemaModule],
  controllers: [CartsController],
  providers: [CartsService, CartsRepositoryService, UsersService],
})
export class CartsModule {}
