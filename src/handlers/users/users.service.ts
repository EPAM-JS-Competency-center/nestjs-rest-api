import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

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
