import { Injectable } from '@nestjs/common';

import { Product } from '@app/entities/product';
import { ProductsRepository } from '@app/repositories/products-repository';

type ListProductsRequest = {
  search?: string;
  page?: { offset?: number; limit?: number };
};

type ListProductsResponse = {
  products: Product[];
};

@Injectable()
export class ListProducts {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(props: ListProductsRequest): Promise<ListProductsResponse> {
    const products = await this.productsRepository.list({
      search: props.search,
      page: props.page,
    });

    return { products };
  }
}
