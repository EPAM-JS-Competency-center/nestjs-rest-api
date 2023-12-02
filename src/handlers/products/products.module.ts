import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

import * as MOCKED_PRODUCTS from './data/products.json';

@Module({
  imports: [],
  controllers: [ ProductsController ],
  providers: [
    ProductsService,
    {
      provide: 'PRODUCTS',
      useValue: MOCKED_PRODUCTS,
    },
  ],
})
export class ProductsModule {}
