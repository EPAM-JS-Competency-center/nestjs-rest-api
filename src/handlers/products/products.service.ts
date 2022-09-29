import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ProductDto, ProductRespDto, ProductUpdateDto } from './dto/product.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductsService implements OnModuleInit {
  private readonly productsList = new Map<string, ProductDto>();

  constructor (
    @Inject('PRODUCTS') private readonly products: ProductDto[],
  ) {
  }

  async onModuleInit () {
    await this.fillQuotesMap();
  }

  getAll (): ProductDto[] {
    return [ ...this.productsList.values() ];
  }

  getById (id: string): ProductRespDto | null {
    const product = this.productsList.get(id);

    return (product != null) ? { product } : null;
  }

  create (product: ProductUpdateDto): ProductDto | null {
    const id = randomUUID();

    this.productsList.set(id, { ...product, id });

    return this.productsList.get(id) ?? null;
  }

  update (product: ProductUpdateDto, id: string): ProductDto | undefined {
    if (this.getById(id) == null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    this.productsList.set(id, { ...product, id });

    return this.productsList.get(id);
  }

  delete (id: string): void {
    if (!this.productsList.has(id)) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    this.productsList.delete(id);
  }

  private async fillQuotesMap (): Promise<void> {
    this.products.forEach((product: ProductDto) => this.productsList.set(product.id, product));
  }
}
