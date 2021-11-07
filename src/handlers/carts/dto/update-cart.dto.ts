import { IsString } from 'class-validator';

export class UpdateCartDto {
  @IsString()
  balance: string;

  @IsString()
  currency: string;
}
