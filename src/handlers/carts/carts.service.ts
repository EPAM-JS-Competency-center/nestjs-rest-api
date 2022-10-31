import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartsRepositoryService } from './carts-repository.service';
import {
  getUserPrimaryKey,
  parseUserPrimaryKey,
} from '../users/utils/user-primary-key.utils';
import { UsersService } from '../users/users.service';
import { User, UserModel } from '../users/users.model';
import { USER_SCHEMA_KEYS } from '../users/users.schema';
import { getIsUserParsedPrimaryKeyValid } from '../users/utils/is-user-parsed-primary-key-valid.util';
import { ListingResponse } from '../../shared/utils/listing-response.util';
import { getIsConditionalCheckFailedException } from '../../database/utils/database-exception-types.utils';
import { CARTS_EXCEPTION_STRATEGIES_KEYS } from './carts-exception.strategies';
import { BASE_EXCEPTION_STRATEGIES_KEYS } from '../../shared/http/base-exception.strategies';

@Injectable()
export class CartsService {
  constructor(
    private cartsRepositoryService: CartsRepositoryService,
    private usersService: UsersService,
  ) {}

  async create(createCartDto: CreateCartDto) {
    await this.usersService.findOne(createCartDto.userId);

    let createdItem;

    try {
      createdItem = await this.cartsRepositoryService.create(createCartDto);
    } catch (error) {
      if (getIsConditionalCheckFailedException(error)) {
        throw new Error(
          CARTS_EXCEPTION_STRATEGIES_KEYS.SUCH_CART_ALREADY_EXIST,
        );
      }
    }

    return {
      id: getUserPrimaryKey(createdItem.userId, createdItem.relationKey),
    };
  }

  async findAll() {
    const data = await this.cartsRepositoryService.findAll();

    return new ListingResponse<User, ReturnType<UserModel['getJSON']>>(
      data,
      data.count,
      { itemMapper: (item) => new UserModel(item).getJSON(USER_SCHEMA_KEYS) },
    ).getJSON();
  }

  async findOne(id: string) {
    if (!getIsUserParsedPrimaryKeyValid(parseUserPrimaryKey(id))) {
      throw new Error(BASE_EXCEPTION_STRATEGIES_KEYS.PROVIDED_ID_INVALID);
    }

    const item = await this.cartsRepositoryService.findOne(id);

    if (!item) {
      throw new Error(CARTS_EXCEPTION_STRATEGIES_KEYS.CART_NOT_FOUND);
    }

    return new UserModel(item).getJSON(USER_SCHEMA_KEYS);
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    await this.findOne(id);

    const item = await this.cartsRepositoryService.update(id, updateCartDto);

    return {
      id: new UserModel(item).getJSON(USER_SCHEMA_KEYS).itemId,
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.cartsRepositoryService.remove(id);
  }
}
