import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { CreateCartDto, CreateCartDtoValid } from '../dto/create-cart.dto';

@Injectable()
export class TransformPipe implements PipeTransform {
  constructor() {}

  transform(value: CreateCartDto, metadata: ArgumentMetadata): CreateCartDtoValid {
    return {
      balance: +value.balance || 0,
      currency: value.currency.toUpperCase(),
    };
  }
}
