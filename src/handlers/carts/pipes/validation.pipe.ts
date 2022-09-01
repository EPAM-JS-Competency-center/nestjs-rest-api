import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateCartDto } from '../dto/create-cart.dto';
import { Currency } from '../constants';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: CreateCartDto, metadata: ArgumentMetadata): CreateCartDto {
    if (value.balance < 0) {
      throw new BadRequestException('Balance cannot be less than 0');
    }
    if (![Currency.UAH, Currency.USD, Currency.EUR].includes(value.currency)) {
      throw new BadRequestException('Wrong currency provided');
    }

    return value;
  }
}
