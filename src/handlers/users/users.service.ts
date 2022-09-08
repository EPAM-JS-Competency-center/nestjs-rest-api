import { Injectable } from '@nestjs/common';
import { User, UserModel } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as uuid from 'uuid';
import { USER_RELATIONS } from './users.relations';
import {
  getUserPrimaryKey,
  parseUserPrimaryKey,
} from './utils/user-primary-key.utils';
import { USER_SCHEMA_KEYS } from './users.schema';
import { getIsUserParsedPrimaryKeyValid } from './utils/is-user-parsed-primary-key-valid.util';
import { ListingResponse } from '../../shared/utils/listing-response.util';
import { USERS_EXCEPTION_STRATEGIES_KEYS } from './users-exception.strategies';
import { BASE_EXCEPTION_STRATEGIES_KEYS } from '../../shared/http/base-exception.strategies';
import { UsersRepositoryService } from './users-repository.service';
import { SortOrder } from 'dynamoose/dist/General';

@Injectable()
export class UsersService {
  constructor(private userRepositoryService: UsersRepositoryService) {}

  get model() {
    return this.userRepositoryService.getModel();
  }

  async findOne(id: string) {
    const key = parseUserPrimaryKey(id);

    if (!getIsUserParsedPrimaryKeyValid(key)) {
      throw new Error(BASE_EXCEPTION_STRATEGIES_KEYS.PROVIDED_ID_INVALID);
    }

    const item = await this.model.get(key);

    if (!item) {
      throw new Error(USERS_EXCEPTION_STRATEGIES_KEYS.USER_NOT_FOUND);
    }

    return new UserModel(item).getJSON(USER_SCHEMA_KEYS);
  }

  async findAll(lastReadItemId: string, pageSize: number) {
    const requestBuilder = this.model
      .query('relationKey')
      .eq(USER_RELATIONS.USER_DETAILS)
      .sort(SortOrder.descending)
      .limit(pageSize);

    if (lastReadItemId) {
      const item = await this.findOne(lastReadItemId);

      const key = {
        ...parseUserPrimaryKey(lastReadItemId),
        createdAt: new Date(item.createdAt).getTime(),
      };

      requestBuilder.startAt(key);
    }

    const data = await requestBuilder.exec();

    return new ListingResponse<User, ReturnType<UserModel['getJSON']>>(
      data,
      data.count,
      {
        itemMapper: (item) => new UserModel(item).getJSON(USER_SCHEMA_KEYS),
        lastReadItemId: data.lastKey
          ? getUserPrimaryKey(data.lastKey.userId, data.lastKey.relationKey)
          : null,
      },
    ).getJSON();
  }

  async create(createDto: CreateUserDto) {
    const createdItem = await this.model.create({
      userId: uuid.v4(),
      relationKey: USER_RELATIONS.USER_DETAILS,
      name: createDto.name,
      email: createDto.email,
    });

    return {
      id: getUserPrimaryKey(createdItem.userId, createdItem.relationKey),
    };
  }
}
