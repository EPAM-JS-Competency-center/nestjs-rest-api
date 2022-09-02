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
    return this.usersService.findOne(id);
  }

  @ApiAuth()
  @ApiQuery({
    name: PaginationKeys.LAST_READ_ITEM_ID,
    type: String,
    required: false,
  })
  @ApiQuery({
    name: PaginationKeys.PAGE_SIZE,
    type: Number,
    required: false,
  })
  @Get()
  findAll(
    @Query(PaginationKeys.LAST_READ_ITEM_ID) lastReadItemId: string,
    @Query(PaginationKeys.PAGE_SIZE) pageSize: string,
  ) {
    return this.usersService.findAll(lastReadItemId, +pageSize);
  }

  @ApiAuth()
  @Post()
  create(@Body() createDto: CreateUserDto) {
    return this.usersService.create(createDto);
  }
}
