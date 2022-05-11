import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';

import { SkipAuth } from '../../guards/skip-auth.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @SkipAuth()
  @Post()
  create(@Body() reqBody) {
    return this.ordersService.create(reqBody);
  }

  @SkipAuth()
  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }
}
