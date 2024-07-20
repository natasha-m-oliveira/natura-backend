import { Product } from '@app/entities/product';
import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';

import { ProductNotFound } from './errors/product-not-found';
import { GetProductById } from './get-product-by-id';

describe('Get Product By Id', () => {
  let productsRepository: InMemoryProductsRepository;
  let getProductById: GetProductById;

  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    getProductById = new GetProductById(productsRepository);
  });

  it('should be able to get product by id', async () => {
    await productsRepository.create(
      new Product({
        name: 'rUOzF',
        price: 56910,
      }),
    );

    const { product } = await getProductById.execute({
      id: productsRepository.products[0].id,
    });

    expect(product).toEqual(productsRepository.products[0]);
  });

  it('should not be able to get non-existent product by id', async () => {
    await expect(
      getProductById.execute({
        id: '2fcf920f-1d70-5783-bc79-248362d4c518',
      }),
    ).rejects.toThrow(ProductNotFound);
  });
});
