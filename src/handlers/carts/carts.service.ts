import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { DataSource, Repository } from 'typeorm';
import { Cart } from './carts.entity';
import { UsersService } from '../users/users.service';
import { SortOrder } from '../../shared/constants';
import { ListingResponse } from '../../shared/utils/listing-response.util';
import { CARTS_EXCEPTION_STRATEGIES_KEYS } from './carts-exception.strategies';

@Injectable()
export class CartsService {
  private repository: Repository<Cart>;

  constructor(
    private dataSource: DataSource,
    private usersService: UsersService,
  ) {
    this.repository = this.dataSource.getRepository<Cart>(Cart);
  }

  async create(createCartDto: CreateCartDto) {
    const user = await this.usersService.findOne(createCartDto.userId);

    const item = await this.repository.save({ ...createCartDto, user });

    return {
      id: item.id,
    };
  }

  async findAll() {
    const [items, count] = await this.repository.findAndCount({
      order: {
        createdAt: SortOrder.DESC,
      },
    });

    return new ListingResponse<Cart>(items, count).toJSON();
  }

  async findOne(id: number) {
    const candidate = await this.repository.findOneBy({ id });

    if (!candidate) {
      throw new Error(CARTS_EXCEPTION_STRATEGIES_KEYS.CART_NOT_FOUND);
    }

    return candidate;
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    await this.findOne(id);

    await this.repository.update({ id }, { ...updateCartDto });

    return {
      id,
    };
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.repository.delete({ id });
  }
}
