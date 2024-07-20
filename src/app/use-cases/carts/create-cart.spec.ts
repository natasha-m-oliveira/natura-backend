import { InMemoryCartsRepository } from '@test/repositories/in-memory-carts-repository';
import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';

import { CreateProduct } from '../products/create-product';
import { ProductNotFound } from '../products/errors/product-not-found';
import { CreateCart } from './create-cart';

describe('Create Cart', () => {
  let cartsRepository: InMemoryCartsRepository;
  let productsRepository: InMemoryProductsRepository;
  let createCart: CreateCart;
  let createProduct: CreateProduct;

  beforeEach(() => {
    cartsRepository = new InMemoryCartsRepository();
    productsRepository = new InMemoryProductsRepository();

    createCart = new CreateCart(cartsRepository, productsRepository);
    createProduct = new CreateProduct(productsRepository);
  });

  it('should be able to create a new cart', async () => {
    const { product } = await createProduct.execute({
      name: 'zixhPC',
      price: 1079,
    });

    const items = [
      {
        productId: product.id,
        quantity: 5,
      },
    ];

    const { cart } = await createCart.execute({
      items: items,
    });

    expect(cart).toEqual(cartsRepository.carts[0]);
  });

  it('should not be able to create a cart if one of the products does not exist', async () => {
    const items = [
      {
        productId: 'beb2b51d-7f10-5f95-809a-de465151cb26',
        quantity: 5,
      },
    ];

    await expect(
      createCart.execute({
        items,
      }),
    ).rejects.toThrow(ProductNotFound);
  });
});
