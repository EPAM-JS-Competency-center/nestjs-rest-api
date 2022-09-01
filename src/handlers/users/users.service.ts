import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { User, UserKey, UserModel } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as uuid from 'uuid';
import { USER_RELATIONS } from './users.relations';
import { NotFoundException } from '../../exceptions/NotFoundException';
import {
  getUserPrimaryKey,
  parseUserPrimaryKey,
} from './utils/user-primary-key.utils';
import { USER_SCHEMA_KEYS } from './users.schema';
import { BadRequestException } from '../../exceptions/BadRequestException';
import { getIsUserParsedPrimaryKeyValid } from './utils/is-user-parsed-primary-key-valid.util';
import { ListingResponse } from '../../shared/utils/listing-response.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User, Partial<UserKey>>,
  ) {}

  async findOne(id: string) {
    const key = parseUserPrimaryKey(id);

    if (!getIsUserParsedPrimaryKeyValid(key)) {
      throw new BadRequestException('Provided id is not correct');
    }

    const item = await this.userModel.get(key);

    if (!item) {
      throw new NotFoundException('This user is not found');
    }

    return new UserModel(item).getJSON(USER_SCHEMA_KEYS);
  }

  async findAll(lastReadItemId: string, pageSize: number) {
    const requestBuilder = this.userModel
      /** Query by index */
      .query('relationKey')
      .eq(USER_RELATIONS.USER_DETAILS)
      .sort('descending' as any)
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
    const createdItem = await this.userModel.create({
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

// lastKey: {
//   createdAt: 1662032319473,
//     userId: '15f488fb-e362-44be-a7cc-c3b314785fb3',
//     relationKey: 'UserDetails'
// },
