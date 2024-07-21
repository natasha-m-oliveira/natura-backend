import { Injectable } from '@nestjs/common';

import { Product } from '@app/entities/product';
import { ProductsRepository } from '@app/repositories/products-repository';
import { QueryOptions } from '@app/repositories/types';

import { PrismaProductMapper } from '../mappers/prisma-product-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProductsRepository extends ProductsRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(product: Product): Promise<void> {
    await this.prisma.product.create({
      data: PrismaProductMapper.toPrisma(product),
    });
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        name,
      },
    });

    if (!product) return null;

    return PrismaProductMapper.toDomain(product);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) return null;

    return PrismaProductMapper.toDomain(product);
  }

  async list(options?: QueryOptions): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: options?.search
        ? {
            OR: [
              {
                name: {
                  contains: options.search,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: options.search,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : undefined,
      skip: options?.page?.offset ? options.page.offset : undefined,
      take: options?.page?.limit ? options.page.limit : undefined,
    });

    return products?.map(PrismaProductMapper.toDomain);
  }

  async save(product: Product): Promise<void> {
    await this.prisma.product.update({
      data: PrismaProductMapper.toPrisma(product),
      where: {
        id: product.id,
      },
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
