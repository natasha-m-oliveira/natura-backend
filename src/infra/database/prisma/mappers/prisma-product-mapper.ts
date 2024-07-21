import { Product } from '@app/entities/product';
import { Product as PrismaProduct } from '@prisma/client';

export type RawProduct = PrismaProduct;

export class PrismaProductMapper {
  static toPrisma(product: Product): PrismaProduct {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      discount: product.discount,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  static toDomain(product: RawProduct): Product {
    return new Product({
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      discount: product.discount,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  }
}
