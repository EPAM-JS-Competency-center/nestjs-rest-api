import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { UtilsModule } from '../../services/utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
