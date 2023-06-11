import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateCartDtoValid } from '../dto/create-cart.dto';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor() {}

  transform(value: CreateCartDtoValid, metadata: ArgumentMetadata): CreateCartDtoValid {
    if (value.balance < 0) {
      throw new BadRequestException('Balance cannot be less than 0');
    }
    return value;
  }
}
