import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { CartsModule } from './controllers/carts/carts.module';
import { FilesModule } from './controllers/files/files.module';
import { ProductsModule } from './controllers/products/products.module';

@Module({
  imports: [
    CartsModule,
    FilesModule,
    ProductsModule,
    RouterModule.register([
      {
        path: 'carts',
        module: CartsModule,
      },
      {
        path: 'files',
        module: FilesModule,
      },
      {
        path: 'products',
        module: ProductsModule,
      },
    ]),
  ],
})
export class HttpModule {}
