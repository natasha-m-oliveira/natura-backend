import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { DeleteCart } from '@app/use-cases/carts/delete-cart';
import { RecourceIdParam } from '@infra/http/dtos/recource-id-param';

import { documentation } from './carts-documentation';

@Controller()
@ApiTags('Carts')
export class DeleteCartController {
  constructor(private deleteCart: DeleteCart) {}

  @Delete(':id')
  @HttpCode(204)
  @ApiParam(documentation.getParam('id'))
  @ApiResponse(documentation.getEndpoint('delete-cart').response)
  async handle(@Param('id', RecourceIdParam) id: string) {
    await this.deleteCart.execute({ id });
  }
}
