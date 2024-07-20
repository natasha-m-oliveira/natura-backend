import { Injectable } from '@nestjs/common';

import { Product } from '@app/entities/product';
import { ProductsRepository } from '@app/repositories/products-repository';

import { ProductAlreadyExists } from './errors/product-already-exists';

type CreateProductRequest = {
  name: string;
  description?: string | null;
  price: number;
  discount?: number | null;
};

type CreateProductResponse = {
  product: Product;
};

@Injectable()
export class CreateProduct {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(props: CreateProductRequest): Promise<CreateProductResponse> {
    const productAlreadyExists = await this.productsRepository.findByName(
      props.name,
    );

    if (productAlreadyExists) throw new ProductAlreadyExists();

    const product = new Product({
      name: props.name,
      description: props.description,
      price: props.price,
      discount: props.discount,
    });

    await this.productsRepository.create(product);

    return { product };
  }
}
