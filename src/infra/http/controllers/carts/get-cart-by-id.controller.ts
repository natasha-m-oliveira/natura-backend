import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetCartById } from '@app/use-cases/carts/get-cart-by-id';
import { ApiDefaultQuerys } from '@infra/http/documentation/decorators/api-default-querys.decorator';
import { RecourceIdParam } from '@infra/http/dtos/recource-id-param';
import { HttpMapperInterceptor } from '@infra/http/interceptors/http-mapper.interceptor';

import { documentation } from './carts-documentation';

@Controller()
@ApiTags('Carts')
export class GetCartByIdController {
  constructor(private getCartById: GetCartById) {}

  @Get(':id')
  @UseInterceptors(HttpMapperInterceptor)
  @ApiParam(documentation.getParam('id'))
  @ApiResponse(documentation.getEndpoint('get-cart-by-id').response)
  @ApiDefaultQuerys(documentation)
  async handle(@Param('id', RecourceIdParam) id: string) {
    const { cart } = await this.getCartById.execute({
      id,
    });

    return cart;
  }
}
