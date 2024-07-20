import { Cart } from '@app/entities/cart';
import { InMemoryCartsRepository } from '@test/repositories/in-memory-carts-repository';

import { DeleteCart } from './delete-cart';
import { CartNotFound } from './errors/cart-not-found';

describe('Delete Cart', () => {
  let cartsRepository: InMemoryCartsRepository;
  let deleteCart: DeleteCart;

  beforeEach(() => {
    cartsRepository = new InMemoryCartsRepository();

    deleteCart = new DeleteCart(cartsRepository);
  });

  it('should be able to delete a cart', async () => {
    await cartsRepository.create(
      new Cart({
        items: [],
      }),
    );

    await deleteCart.execute({
      id: cartsRepository.carts[0].id,
    });

    expect(cartsRepository.carts.length).toEqual(0);
  });

  it('should not be able to delete a non-existent cart', async () => {
    await expect(
      deleteCart.execute({
        id: '2fcf920f-1d70-5783-bc79-248362d4c518',
      }),
    ).rejects.toThrow(CartNotFound);
  });
});
