import { Inject, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UtilsService } from '../../services/utils/utils.service';
import { ConfigService } from '../../services/config/config.service';

@Injectable()
export class CartsService {
  constructor(
    private readonly utilsService: UtilsService,
    private readonly configService: ConfigService,

    @Inject('DateService')
    private readonly DateService,
  ) {
    console.log(`Current env: ${configService.appConfig.env}`);
  }

  average() {
    return this.utilsService.average([1,2,3]);
  }

  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  findAll() {
    return `This action returns all carts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
