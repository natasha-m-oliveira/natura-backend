import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { CreateProduct } from '@app/use-cases/products/create-product';
import { DeleteProduct } from '@app/use-cases/products/delete-product';
import { GetProductById } from '@app/use-cases/products/get-product-by-id';
import { ListProducts } from '@app/use-cases/products/list-products';
import { UpdateProductImage } from '@app/use-cases/products/update-product-image';
import { QueryOptionsMiddleware } from '@infra/http/middlewares/query-options.middleware';

import { CreateProductController } from './create-product.controller';
import { DeleteProductController } from './delete-product.controller';
import { GetProductByIdController } from './get-product-by-id.controller';
import { ListProductsController } from './list-products.controller';
import { UpdateProductImageController } from './update-product-image.controller';

@Module({
  controllers: [
    CreateProductController,
    ListProductsController,
    GetProductByIdController,
    UpdateProductImageController,
    DeleteProductController,
  ],
  providers: [
    CreateProduct,
    ListProducts,
    GetProductById,
    UpdateProductImage,
    DeleteProduct,
  ],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(QueryOptionsMiddleware).forRoutes({
      path: 'products',
      method: RequestMethod.GET,
    });
  }
}
