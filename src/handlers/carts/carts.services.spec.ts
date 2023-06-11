import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../../services/config/config.service';
import { UtilsService } from '../../services/utils/utils.service';
import { CartsService } from './carts.service';

describe('CartsService', () => {
  let service: CartsService;
  let utilsService: UtilsService;
  let configService: ConfigService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartsService,
        {
          provide: UtilsService,
          useValue: {
            average: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            appConfig: {
              env: 'testing',
            },
          },
        },
      ],
    }).compile();

    service = module.get<CartsService>(CartsService);
    utilsService = module.get<UtilsService>(UtilsService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(utilsService).toBeDefined();
    expect(configService).toBeDefined();
  });

  it('Should return the average', () => {
    jest.spyOn(utilsService, 'average').mockReturnValue(4);

    const response = service.average();

    expect(response).toBe(4);
    expect(utilsService.average).toBeCalledWith([1, 2, 3]);
  });

  it('Should return message on create', () => {
    const response = service.create({ balance: '1', currency: 'USD' });

    expect(response).toBe('This action adds a new cart');
  });
});
