import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { DeleteProduct } from '@app/use-cases/products/delete-product';
import { RecourceIdParam } from '@infra/http/dtos/recource-id-param';

import { documentation } from './products-documentation';

@Controller()
@ApiTags('Products')
export class DeleteProductController {
  constructor(private deleteProduct: DeleteProduct) {}

  @Delete(':id')
  @HttpCode(204)
  @ApiParam(documentation.getParam('id'))
  @ApiResponse(documentation.getEndpoint('delete-product').response)
  async handle(@Param('id', RecourceIdParam) id: string) {
    await this.deleteProduct.execute({ id });
  }
}
