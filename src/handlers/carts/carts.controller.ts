import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDtoValid } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { TransformPipe } from './pipes/transform.pipe';
import { ValidationPipe } from './pipes/validation.pipe';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('/average')
  average() {
    return this.cartsService.average();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number
  ) {
    return typeof id;
  }

  @Post()
  create(@Body(TransformPipe, ValidationPipe) createCartDto: CreateCartDtoValid) {
    return createCartDto;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }
}
