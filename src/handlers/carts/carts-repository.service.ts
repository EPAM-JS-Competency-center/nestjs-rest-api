import { Injectable } from '@nestjs/common';
import { UserKey } from '../users/users.model';
import { CreateCartDto } from './dto/create-cart.dto';
import { USER_RELATIONS } from '../users/users.relations';
import { parseUserPrimaryKey } from '../users/utils/user-primary-key.utils';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UsersRepositoryService } from '../users/users-repository.service';

@Injectable()
export class CartsRepositoryService {
  constructor(private userRepositoryService: UsersRepositoryService) {}

  get model() {
    return this.userRepositoryService.getModel();
  }

  async create(createCartDto: CreateCartDto) {
    const key: UserKey = parseUserPrimaryKey(createCartDto.userId);

    return this.model.create({
      userId: key.userId,
      relationKey: `${USER_RELATIONS.CART}${createCartDto.currency}`,
      currency: createCartDto.currency,
      balance: createCartDto.balance,
    });
  }

  async findAll() {
    return await this.model
      .scan()
      .filter('relationKey')
      .contains(USER_RELATIONS.CART)
      .exec();
  }

  async findOne(id: string) {
    return this.model.get(parseUserPrimaryKey(id));
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const key = parseUserPrimaryKey(id);

    return this.model.update(key, updateCartDto);
  }

  async remove(id: string) {
    const key = parseUserPrimaryKey(id);

    return this.model.delete(key);
  }
}
