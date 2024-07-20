import { Cart } from '@app/entities/cart';
import { Product } from '@app/entities/product';
import { InMemoryCartsRepository } from '@test/repositories/in-memory-carts-repository';
import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';

import { ProductNotFound } from '../products/errors/product-not-found';
import { CartNotFound } from './errors/cart-not-found';
import { UpdateCartItems } from './update-cart-items';

describe('Update Cart Items', () => {
  let cartsRepository: InMemoryCartsRepository;
  let productsRepository: InMemoryProductsRepository;
  let updateCartItems: UpdateCartItems;

  beforeEach(() => {
    cartsRepository = new InMemoryCartsRepository();
    productsRepository = new InMemoryProductsRepository();

    updateCartItems = new UpdateCartItems(cartsRepository, productsRepository);
  });

  it('should be able to update items in a cart', async () => {
    const cart = new Cart({
      items: [],
    });

    await cartsRepository.create(cart);

    const product = new Product({
      name: 'uFkl',
      price: 33539,
    });

    await productsRepository.create(product);

    await updateCartItems.execute({
      id: cart.id,
      items: [
        {
          productId: product.id,
          quantity: 1,
        },
      ],
    });

    expect(cartsRepository.carts[0].items.length).toEqual(1);
    expect(cartsRepository.carts[0].items[0].productId).toEqual(product.id);
  });

  it('should not be able to update items in a non-existent cart', async () => {
    expect(
      updateCartItems.execute({
        id: '2f65b2c6-da79-5c12-82d3-a4074bc77860',
        items: [],
      }),
    ).rejects.toBeInstanceOf(CartNotFound);
  });

  it('should not be able to update cart items if one of the products does not exist', async () => {
    const cart = new Cart({
      items: [],
    });

    await cartsRepository.create(cart);

    expect(
      updateCartItems.execute({
        id: cart.id,
        items: [
          {
            productId: 'eb2fcc81-bfeb-5d4b-954e-76de07ae8124',
            quantity: 10,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(ProductNotFound);
  });
});
