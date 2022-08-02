import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductDto {
  @IsNumber()
  @IsNotEmpty()
  count: number;
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class ProductUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  count: number;
  @IsString()
  @IsOptional()
  description: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class ProductIdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class ProductRespDto {
  product: ProductDto;
}
