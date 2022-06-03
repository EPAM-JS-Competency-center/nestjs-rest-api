import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ProductDto, ProductIdDto, ProductRespDto, ProductUpdateDto } from './dto/product.dto';
import { ProductsService } from './products.service';
import { SkipAuth } from '../../guards/skip-auth.decorator';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @SkipAuth()
  getAllProducts(): ProductDto[] {
    return this.productsService.getAll();
  }

  @Get(':id')
  @SkipAuth()
  getById(@Param() { id }: ProductIdDto): ProductRespDto {
    return this.productsService.getById(id);
  }

  @Post()
  @SkipAuth()
  create(@Res() res, @Body() productData: ProductUpdateDto) {
    const newProduct = this.productsService.create(productData);

    return res
      .status(HttpStatus.OK)
      .json(`Product was successfully created.\n ${ JSON.stringify(newProduct) }`);
  }

  @Put(':id')
  @SkipAuth()
  update(@Res() res, @Param() { id }: ProductIdDto, @Body() productData: ProductUpdateDto) {
    const updatedProduct = this.productsService.update(productData, id);

    return res
      .status(HttpStatus.OK)
      .json(`Product was successfully updated.\n ${ JSON.stringify(updatedProduct) }`);
  }

  @Delete(':id')
  @SkipAuth()
  delete(@Res() res, @Param() { id }: ProductIdDto) {
    this.productsService.delete(id);

    return res
      .status(HttpStatus.OK)
      .json(`Product ${ id }was successfully deleted.`);
  }
}
