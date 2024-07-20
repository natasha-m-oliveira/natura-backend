import { Injectable } from '@nestjs/common';

import { CartsRepository } from '@app/repositories/carts-repository';

import { CartNotFound } from './errors/cart-not-found';

type DeleteCartRequest = {
  id: string;
};

type DeleteCartResponse = void;

@Injectable()
export class DeleteCart {
  constructor(private cartsRepository: CartsRepository) {}

  async execute(props: DeleteCartRequest): Promise<DeleteCartResponse> {
    const cart = await this.cartsRepository.findById(props.id);

    if (!cart) throw new CartNotFound();

    await this.cartsRepository.deleteById(props.id);
  }
}
