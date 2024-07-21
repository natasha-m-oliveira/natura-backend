import { Body, Controller, Param, Put, UseInterceptors } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UpdateCartItems } from '@app/use-cases/carts/update-cart-items';
import { UpdateCartItemsBody } from '@infra/http/dtos/carts/update-cart-items-body';
import { RecourceIdParam } from '@infra/http/dtos/recource-id-param';
import { HttpMapperInterceptor } from '@infra/http/interceptors/http-mapper.interceptor';

import { documentation } from './carts-documentation';

@Controller()
@ApiTags('Carts')
@ApiBearerAuth()
export class UpdateCartItemsController {
  constructor(private updateCartItems: UpdateCartItems) {}

  @Put(':id/items')
  @UseInterceptors(HttpMapperInterceptor)
  @ApiParam(documentation.getParam('id'))
  @ApiBody(documentation.getEndpoint('update-cart-items').body)
  @ApiResponse(documentation.getEndpoint('update-cart-items').response)
  async handle(
    @Param('id', RecourceIdParam) id: string,
    @Body() body: UpdateCartItemsBody,
  ) {
    const { cart } = await this.updateCartItems.execute({ id, ...body });

    return cart;
  }
}
