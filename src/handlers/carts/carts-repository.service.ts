import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { User, UserKey } from '../users/users.model';
import { CreateCartDto } from './dto/create-cart.dto';
import { USER_RELATIONS } from '../users/users.relations';
import { parseUserPrimaryKey } from '../users/utils/user-primary-key.utils';
import { UpdateCartDto } from './dto/update-cart.dto';
import { USER_TITLE } from '../users/users.schema';

@Injectable()
export class CartsRepositoryService {
  constructor(
    @InjectModel(USER_TITLE)
    private userModel: Model<User, UserKey>,
  ) {}

  async create(createCartDto: CreateCartDto) {
    const key: UserKey = parseUserPrimaryKey(createCartDto.userId);

    return this.userModel.create({
      userId: key.userId,
      relationKey: `${USER_RELATIONS.CART}${createCartDto.currency}`,
      currency: createCartDto.currency,
      balance: createCartDto.balance,
    });
  }

  async findAll() {
    return await this.userModel
      .scan()
      .filter('relationKey')
      .contains(USER_RELATIONS.CART)
      .exec();
  }

  async findOne(id: string) {
    return this.userModel.get(parseUserPrimaryKey(id));
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const key = parseUserPrimaryKey(id);

    return this.userModel.update(key, updateCartDto);
  }

  async remove(id: string) {
    const key = parseUserPrimaryKey(id);

    return this.userModel.delete(key);
  }
}
