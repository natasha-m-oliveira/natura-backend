import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';

import { CreateProduct } from './create-product';
import { ProductAlreadyExists } from './errors/product-already-exists';

describe('Create Product', () => {
  let productsRepository: InMemoryProductsRepository;
  let createProduct: CreateProduct;

  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    createProduct = new CreateProduct(productsRepository);
  });

  it('should be able to create a new product', async () => {
    const { product } = await createProduct.execute({
      name: 'iWak',
      price: 18900,
    });

    expect(product).toEqual(productsRepository.products[0]);
  });

  it('should not be able to create a product already exists', async () => {
    await createProduct.execute({
      name: 'iqhS',
      price: 7900,
    });

    await expect(
      createProduct.execute({
        name: 'iqhS',
        price: 3800,
      }),
    ).rejects.toThrow(ProductAlreadyExists);
  });
});
