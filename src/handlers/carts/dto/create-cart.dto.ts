import { Currency } from '../constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Min } from 'class-validator';

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
  @IsString()
  userId: string;
}
