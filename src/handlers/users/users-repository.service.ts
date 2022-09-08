import { BaseRepository } from '../../database/base.repository';
import { SchemaDefinition } from 'dynamoose/dist/Schema';
import { UserSchema } from './users.schema';
import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { AnyItem } from 'dynamoose/dist/Item';

@Injectable()
export class UsersRepositoryService extends BaseRepository<User & AnyItem> {
  constructor() {
    super('Users', UserSchema as unknown as SchemaDefinition);
  }
}
