import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepositoryService } from './users-repository.service';

@Module({
  providers: [UsersService, UsersRepositoryService],
  controllers: [UsersController],
})
export class UsersModule {}
