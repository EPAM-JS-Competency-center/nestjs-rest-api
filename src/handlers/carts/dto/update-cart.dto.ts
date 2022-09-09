import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  balance: number;
}
