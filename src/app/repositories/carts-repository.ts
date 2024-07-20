import { Cart } from '../entities/cart';

export abstract class CartsRepository {
  abstract create(cart: Cart): Promise<void>;
  abstract findById(id: string): Promise<Cart | null>;
  abstract save(cart: Cart): Promise<void>;
  abstract deleteById(id: string): Promise<void>;
}
