import { Currency } from '../constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, Min } from 'class-validator';

export class CreateCartDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  balance: number;

  @ApiProperty()
  @IsEnum(Currency)
  @ApiProperty({
    enum: Currency,
  })
  currency: Currency;

  @ApiProperty()
  @IsNumber()
  userId: number;
}
