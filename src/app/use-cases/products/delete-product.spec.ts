import { Product } from '@app/entities/product';
import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';

import { DeleteProduct } from './delete-product';
import { ProductNotFound } from './errors/product-not-found';

describe('Delete Product', () => {
  let productsRepository: InMemoryProductsRepository;
  let deleteProduct: DeleteProduct;

  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    deleteProduct = new DeleteProduct(productsRepository);
  });

  it('should be able to delete a product', async () => {
    await productsRepository.create(
      new Product({
        name: 'WdccB',
        price: 12999,
      }),
    );

    await deleteProduct.execute({
      id: productsRepository.products[0].id,
    });

    expect(productsRepository.products.length).toEqual(0);
  });

  it('should not be able to delete a non-existent product', async () => {
    await expect(
      deleteProduct.execute({
        id: '2fcf920f-1d70-5783-bc79-248362d4c518',
      }),
    ).rejects.toThrow(ProductNotFound);
  });
});
