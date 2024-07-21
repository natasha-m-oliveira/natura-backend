import { Module } from '@nestjs/common';

import { CartsRepository } from '@app/repositories/carts-repository';
import { ProductsRepository } from '@app/repositories/products-repository';

import { PrismaService } from './prisma/prisma.service';
import { PrismaCartsRepository } from './prisma/repositories/prisma-carts-repository';
import { PrismaProductsRepository } from './prisma/repositories/prisma-products-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CartsRepository,
      useClass: PrismaCartsRepository,
    },
    {
      provide: ProductsRepository,
      useClass: PrismaProductsRepository,
    },
  ],
  exports: [CartsRepository, ProductsRepository],
})
export class DatabaseModule {}
