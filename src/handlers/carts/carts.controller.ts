import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ValidationPipe } from './pipes/validation.pipe';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('Carts')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @ApiHeader({
    name: 'x-api-key',
    description: 'Provide auth key',
    required: true,
  })
  @Post()
  create(@Body(ValidationPipe) createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @ApiHeader({
    name: 'x-api-key',
    description: 'Provide auth key',
    required: true,
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(id, updateCartDto);
  }

  @ApiHeader({
    name: 'x-api-key',
    description: 'Provide auth key',
    required: true,
  })
  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @ApiHeader({
    name: 'x-api-key',
    description: 'Provide auth key',
    required: true,
  })
  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.cartsService.findOne(id);
  }

  @ApiHeader({
    name: 'x-api-key',
    description: 'Provide auth key',
    required: true,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}
