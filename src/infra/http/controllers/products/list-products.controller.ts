import { Request } from 'express';

import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ListProducts } from '@app/use-cases/products/list-products';
import { ApiDefaultQuerys } from '@infra/http/documentation/decorators/api-default-querys.decorator';
import { HttpMapperInterceptor } from '@infra/http/interceptors/http-mapper.interceptor';

import { documentation } from './products-documentation';

@Controller()
@ApiTags('Products')
@ApiBearerAuth()
export class ListProductsController {
  constructor(private listProducts: ListProducts) {}

  @Get()
  @UseInterceptors(HttpMapperInterceptor)
  @ApiResponse(documentation.getEndpoint('list-products').response)
  @ApiDefaultQuerys(documentation)
  async handle(@Req() req: Request) {
    const { products } = await this.listProducts.execute(req);

    return products;
  }
}
