import { Injectable } from '@nestjs/common';

import { Cart } from '@app/entities/cart';
import { CartItem } from '@app/entities/cart-item';
import { CartsRepository } from '@app/repositories/carts-repository';

import { ProductsRepository } from '../../repositories/products-repository';
import { ProductNotFound } from '../products/errors/product-not-found';

type CreateCartRequest = {
  items: {
    productId: string;
    quantity: number;
  }[];
};

type CreateCartResponse = {
  cart: Cart;
};

@Injectable()
export class CreateCart {
  constructor(
    private cartsRepository: CartsRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute(props: CreateCartRequest): Promise<CreateCartResponse> {
    const cart = new Cart({
      items: [],
    });

    const items = await Promise.all(
      props.items.map(async (item) => {
        const product = await this.productsRepository.findById(item.productId);

        if (!product) throw new ProductNotFound();

        return new CartItem({
          productId: item.productId,
          cartId: cart.id,
          quantity: item.quantity,
        });
      }),
    );

    cart.items = items;

    await this.cartsRepository.create(cart);

    return { cart };
  }
}
