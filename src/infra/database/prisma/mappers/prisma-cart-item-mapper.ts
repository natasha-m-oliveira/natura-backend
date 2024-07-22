import { CartItem } from '@app/entities/cart-item';
import { CartItem as PrismaCartItem } from '@prisma/client';

import { PrismaProductMapper, RawProduct } from './prisma-product-mapper';

export type RawCartItem = PrismaCartItem & {
  product?: RawProduct;
};

export class PrismaCartItemMapper {
  static toPrisma(cartItem: CartItem): PrismaCartItem {
    return {
      id: cartItem.id,
      cartId: cartItem.cartId,
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      createdAt: cartItem.createdAt,
    };
  }

  static toDomain(cartItem: RawCartItem): CartItem {
    return new CartItem({
      id: cartItem.id,
      cartId: cartItem.cartId,
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      createdAt: cartItem.createdAt,

      product:
        cartItem.product && PrismaProductMapper.toDomain(cartItem.product),
    });
  }
}
