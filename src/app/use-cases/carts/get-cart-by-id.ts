import { Injectable } from '@nestjs/common';

import { Cart } from '@app/entities/cart';
import { CartsRepository } from '@app/repositories/carts-repository';

import { CartNotFound } from './errors/cart-not-found';

type GetCartByIdRequest = {
  id: string;
};

type GetCartByIdResponse = {
  cart: Cart;
};

@Injectable()
export class GetCartById {
  constructor(private cartsRepository: CartsRepository) {}

  async execute(props: GetCartByIdRequest): Promise<GetCartByIdResponse> {
    const cart = await this.cartsRepository.findById(props.id);

    if (!cart) throw new CartNotFound();

    return { cart };
  }
}
