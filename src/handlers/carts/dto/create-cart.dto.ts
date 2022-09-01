import { Currency } from '../constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty()
  balance: number;

  @ApiProperty({
    enum: Currency,
  })
  currency: Currency;

  @ApiProperty()
  userId: string;
}
