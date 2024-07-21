import { Injectable } from '@nestjs/common';

import { Cart } from '@app/entities/cart';
import { CartItem } from '@app/entities/cart-item';
import { CartsRepository } from '@app/repositories/carts-repository';
import { ProductsRepository } from '@app/repositories/products-repository';

import { ProductNotFound } from '../products/errors/product-not-found';
import { CartNotFound } from './errors/cart-not-found';

type UpdateCartItemsRequest = {
  id: string;
  items: {
    productId: string;
    quantity: number;
  }[];
};

type UpdateCartItemsResponse = {
  cart: Cart;
};

@Injectable()
export class UpdateCartItems {
  constructor(
    private cartsRepository: CartsRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute(
    props: UpdateCartItemsRequest,
  ): Promise<UpdateCartItemsResponse> {
    const cart = await this.cartsRepository.findById(props.id);

    if (!cart) throw new CartNotFound();

    const items = await Promise.all(
      props.items.map(async (item) => {
        const product = await this.productsRepository.findById(item.productId);

        if (!product) throw new ProductNotFound();

        return new CartItem({
          cartId: cart.id,
          productId: item.productId,
          quantity: item.quantity,
        });
      }),
    );

    cart.items = items;

    await this.cartsRepository.save(cart);

    return { cart };
  }
}
