import { Cart } from '@app/entities/cart';
import { InMemoryCartsRepository } from '@test/repositories/in-memory-carts-repository';

import { CartNotFound } from './errors/cart-not-found';
import { GetCartById } from './get-cart-by-id';

describe('Get Cart By Id', () => {
  let cartsRepository: InMemoryCartsRepository;
  let getCartById: GetCartById;

  beforeEach(() => {
    cartsRepository = new InMemoryCartsRepository();

    getCartById = new GetCartById(cartsRepository);
  });

  it('should be able to get cart by id', async () => {
    await cartsRepository.create(
      new Cart({
        items: [],
      }),
    );

    const { cart } = await getCartById.execute({
      id: cartsRepository.carts[0].id,
    });

    expect(cart).toEqual(cartsRepository.carts[0]);
  });

  it('should not be able to get non-existent cart by id', async () => {
    await expect(
      getCartById.execute({
        id: '2fcf920f-1d70-5783-bc79-248362d4c518',
      }),
    ).rejects.toThrow(CartNotFound);
  });
});
