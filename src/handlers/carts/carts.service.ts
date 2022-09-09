import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  async create(createCartDto: CreateCartDto) {
    return {
      id: 0,
    };
  }

  async findAll() {
    return [];
  }

  async findOne(id: string) {
    return { id: 0 };
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    return { id: 0 };
  }

  async remove(id: string) {
    return void 0;
  }
}
