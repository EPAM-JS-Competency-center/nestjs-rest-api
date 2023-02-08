import { Test } from '@nestjs/testing';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { UtilsModule } from '../../services/utils/utils.module';
import { ConfigService } from '../../services/config/config.service';

describe('CartsController', () => {
  let cartsController: CartsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UtilsModule],
      controllers: [CartsController],
      providers: [ConfigService, CartsService],
    }).compile();

    cartsController = moduleRef.get<CartsController>(CartsController);
  });

  it('instance should be an instanceof CartsController', () => {
    expect(cartsController instanceof CartsController).toBeTruthy();
  });
});
