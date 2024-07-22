import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetProductById } from '@app/use-cases/products/get-product-by-id';
import { ApiDefaultQuerys } from '@infra/http/documentation/decorators/api-default-querys.decorator';
import { RecourceIdParam } from '@infra/http/dtos/recource-id-param';
import { HttpMapperInterceptor } from '@infra/http/interceptors/http-mapper.interceptor';

import { documentation } from './products-documentation';

@Controller()
@ApiTags('Products')
export class GetProductByIdController {
  constructor(private getProductById: GetProductById) {}

  @Get(':id')
  @UseInterceptors(HttpMapperInterceptor)
  @ApiParam(documentation.getParam('id'))
  @ApiResponse(documentation.getEndpoint('get-product-by-id').response)
  @ApiDefaultQuerys(documentation)
  async handle(@Param('id', RecourceIdParam) id: string) {
    const { product } = await this.getProductById.execute({
      id,
    });

    return product;
  }
}
