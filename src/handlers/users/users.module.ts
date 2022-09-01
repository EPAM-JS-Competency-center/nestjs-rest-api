import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UserSchema } from './users.schema';

export const UserSchemaModule = DynamooseModule.forFeature([
  {
    name: 'User',
    schema: UserSchema,
  },
]);

@Module({
  imports: [UserSchemaModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
