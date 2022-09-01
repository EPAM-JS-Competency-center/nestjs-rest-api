import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

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
    return this.usersService.findOne(id);
  }

  @ApiHeader({
    name: 'x-api-key',
    description: 'Provide auth key',
    required: true,
  })
  @ApiQuery({
    name: 'lastReadItemId',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    required: false,
  })
  @Get()
  findAll(
    @Query('lastReadItemId') lastReadItemId: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.usersService.findAll(lastReadItemId, +pageSize);
  }

  @ApiHeader({
    name: 'x-api-key',
    description: 'Provide auth key',
    required: true,
  })
  @Post()
  create(@Body() createDto: CreateUserDto) {
    return this.usersService.create(createDto);
  }
}
