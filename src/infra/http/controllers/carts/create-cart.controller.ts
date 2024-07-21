import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateCart } from '@app/use-cases/carts/create-cart';
import { CreateCartBody } from '@infra/http/dtos/carts/create-cart-body';
import { HttpMapperInterceptor } from '@infra/http/interceptors/http-mapper.interceptor';

import { documentation } from './carts-documentation';

@Controller()
@ApiTags('Carts')
export class CreateCartController {
  constructor(private createCart: CreateCart) {}

  @Post()
  @UseInterceptors(HttpMapperInterceptor)
  @ApiBody(documentation.getEndpoint('create-cart').body)
  @ApiResponse(documentation.getEndpoint('create-cart').response)
  async handle(@Body() body: CreateCartBody) {
    const { cart } = await this.createCart.execute(body);

    return cart;
  }
}
