import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  private repository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository<User>(User);
  }

  async findOne(id: string) {
    return { id: 0 };
  }

  async findAll(pageNumber: number, pageSize: number) {
    return [];
  }

  async create(createDto: CreateUserDto) {
    return { id: 0 };
  }
}
