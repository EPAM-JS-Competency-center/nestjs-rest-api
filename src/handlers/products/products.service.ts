import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ProductDto, ProductRespDto, ProductUpdateDto } from './dto/product.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductsService implements OnModuleInit {
  private productsList = new Map<string, ProductDto>();

  constructor(
    @Inject('PRODUCTS') private products: ProductDto[],
  ) {
  }

  async onModuleInit() {
    await this.fillQuotesMap();
  }

  getAll(): ProductDto[] {
    return [ ...this.productsList.values() ];
  }

  getById(id: string): ProductRespDto {
    return { product: this.productsList.get(id) };
  }

  create(product: ProductUpdateDto): ProductDto {
    const id = randomUUID();

    this.productsList.set(id, { ...product, id });

    return this.productsList.get(id);
  }

  update(product: ProductUpdateDto, id: string): ProductDto {
    if (!this.getById(id)) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    this.productsList.set(id, { ...product, id });

    return this.productsList.get(id);
  }

  delete(id: string): void {
    if (!this.productsList.has(id)) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    this.productsList.delete(id);
  }

  private async fillQuotesMap(): Promise<void> {
    this.products.forEach((product: ProductDto) => this.productsList.set(product.id, product));
  }
}
