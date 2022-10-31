import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiAuth } from '../../api-docs/api-docs.decorators';
import { PaginationKeys } from '../../shared/constants';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiAuth()
  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.usersService.findOne(+id);
  }

  @ApiAuth()
  @ApiQuery({
    name: PaginationKeys.PAGE_NUMBER,
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: PaginationKeys.PAGE_SIZE,
    type: Number,
    required: false,
  })
  @Get()
  findAll(
    @Query(PaginationKeys.PAGE_NUMBER) pageNumber: string,
    @Query(PaginationKeys.PAGE_SIZE) pageSize: string,
  ) {
    return this.usersService.findAll(+pageNumber, +pageSize);
  }

  @ApiAuth()
  @Post()
  create(@Body() createDto: CreateUserDto) {
    return this.usersService.create(createDto);
  }
}
