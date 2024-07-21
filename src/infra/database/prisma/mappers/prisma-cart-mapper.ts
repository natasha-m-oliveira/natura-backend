import { Cart, CartStatus } from '@app/entities/cart';
import { Cart as PrismaCart, Prisma } from '@prisma/client';

import { PrismaCartItemMapper, RawCartItem } from './prisma-cart-item-mapper';

export type RawCart = PrismaCart & {
  items?: RawCartItem[];
};

export type CartCreateInput = Pick<Prisma.CartCreateArgs, 'data'>;

export type CartUpdateInput = Pick<Prisma.CartUpdateArgs, 'data'>;

export class PrismaCartMapper {
  static toCreate(cart: Cart): CartCreateInput {
    const input: CartCreateInput = {
      data: this.toPrisma(cart),
    };

    if (cart.items?.length) {
      input.data.items = {
        createMany: {
          data: cart.items.map((item) => {
            const raw = PrismaCartItemMapper.toPrisma(item);
            return { ...raw, cartId: undefined };
          }),
        },
      };
    }

    return input;
  }

  static toUpdate(cart: Cart): CartUpdateInput {
    const input: CartUpdateInput = {
      data: this.toPrisma(cart),
    };

    if (cart.items?.length) {
      input.data.items = {
        deleteMany: {},
        createMany: {
          data: cart.items.map((item) => {
            const raw = PrismaCartItemMapper.toPrisma(item);
            return { ...raw, cartId: undefined };
          }),
        },
      };
    }

    return input;
  }

  static toPrisma(cart: Cart): PrismaCart {
    return {
      id: cart.id,
      status: cart.status,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    };
  }

  static toDomain(cart: RawCart): Cart {
    return new Cart({
      id: cart.id,
      status: CartStatus[cart.status],
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,

      items: cart.items?.map(PrismaCartItemMapper.toDomain),
    });
  }
}
