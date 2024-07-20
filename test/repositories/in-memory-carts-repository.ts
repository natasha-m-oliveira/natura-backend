import { randomUUID } from 'node:crypto';

import { Cart } from '@app/entities/cart';
import { CartsRepository } from '@app/repositories/carts-repository';

export class InMemoryCartsRepository extends CartsRepository {
  public readonly carts: Cart[] = [];

  async create(cart: Cart): Promise<void> {
    Object.assign(cart, {
      id: randomUUID(),
    });

    this.carts.push(cart);
  }

  async findById(id: string): Promise<Cart | null> {
    const cart = this.carts.find((cart) => cart.id === id);

    if (!cart) return null;

    return cart;
  }

  async save(cart: Cart): Promise<void> {
    const index = this.carts.findIndex(({ id }) => id === cart.id);

    this.carts.splice(index, 1, cart);
  }

  async deleteById(id: string): Promise<void> {
    const index = this.carts.findIndex((cart) => cart.id === id);

    this.carts.splice(index, 1);
  }
}
