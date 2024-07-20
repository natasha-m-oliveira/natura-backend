import { Product } from '@app/entities/product';
import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';

import { ListProducts } from './list-products';

describe('List Products', () => {
  let productsRepository: InMemoryProductsRepository;
  let listProducts: ListProducts;

  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    listProducts = new ListProducts(productsRepository);
  });

  it('should be able to list products', async () => {
    await productsRepository.create(
      new Product({
        name: 'YMIruz',
        price: 1407,
      }),
    );

    const { products } = await listProducts.execute({});

    expect(products.length).toEqual(1);
  });
});
