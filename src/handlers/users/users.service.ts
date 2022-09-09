import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
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
