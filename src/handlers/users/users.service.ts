import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from './users.entity';
import { USERS_EXCEPTION_STRATEGIES_KEYS } from './users-exception.strategies';
import { ListingResponse } from '../../shared/utils/listing-response.util';
import { Pager } from '../../shared/utils/pager.util';
import { SortOrder } from '../../shared/constants';

@Injectable()
export class UsersService {
  private repository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository<User>(User);
  }

  async findOne(id: number) {
    const candidate = await this.repository.findOne({
      where: { id },
      relations: ['carts'],
    });

    if (!candidate) {
      throw new Error(USERS_EXCEPTION_STRATEGIES_KEYS.USER_NOT_FOUND);
    }

    return candidate;
  }

  async findAll(pageNumber: number, pageSize: number) {
    const pager = new Pager(pageNumber, pageSize);

    const [item, count] = await this.repository.findAndCount({
      order: {
        createdAt: SortOrder.DESC,
      },
      ...pager,
    });

    return new ListingResponse<User>(item, count).toJSON();
  }

  async create(createDto: CreateUserDto) {
    const user = await this.repository.save(createDto);

    return { id: user.id };
  }
}
