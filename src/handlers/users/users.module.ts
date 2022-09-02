import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchemaModule } from './users.schema';

@Module({
  imports: [UserSchemaModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
