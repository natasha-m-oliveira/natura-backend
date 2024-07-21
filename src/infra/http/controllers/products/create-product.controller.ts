import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateProduct } from '@app/use-cases/products/create-product';
import { CreateProductBody } from '@infra/http/dtos/products/create-product-body';
import { HttpMapperInterceptor } from '@infra/http/interceptors/http-mapper.interceptor';

import { documentation } from './products-documentation';

@Controller()
@ApiTags('Products')
export class CreateProductController {
  constructor(private createProduct: CreateProduct) {}

  @Post()
  @UseInterceptors(HttpMapperInterceptor)
  @ApiBody(documentation.getEndpoint('create-product').body)
  @ApiResponse(documentation.getEndpoint('create-product').response)
  async handle(@Body() body: CreateProductBody) {
    const { product } = await this.createProduct.execute(body);

    return product;
  }
}
