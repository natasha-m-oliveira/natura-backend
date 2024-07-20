import { Injectable } from '@nestjs/common';

import { Product } from '@app/entities/product';
import { ProductsRepository } from '@app/repositories/products-repository';

import { ProductNotFound } from './errors/product-not-found';

type GetProductByIdRequest = {
  id: string;
};

type GetProductByIdResponse = {
  product: Product;
};

@Injectable()
export class GetProductById {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(props: GetProductByIdRequest): Promise<GetProductByIdResponse> {
    const product = await this.productsRepository.findById(props.id);

    if (!product) throw new ProductNotFound();

    return { product };
  }
}
