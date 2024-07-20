import { Injectable } from '@nestjs/common';

import { ProductsRepository } from '@app/repositories/products-repository';

import { ProductNotFound } from './errors/product-not-found';

type DeleteProductRequest = {
  id: string;
};

type DeleteProductResponse = void;

@Injectable()
export class DeleteProduct {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(props: DeleteProductRequest): Promise<DeleteProductResponse> {
    const product = await this.productsRepository.findById(props.id);

    if (!product) throw new ProductNotFound();

    await this.productsRepository.deleteById(props.id);
  }
}
