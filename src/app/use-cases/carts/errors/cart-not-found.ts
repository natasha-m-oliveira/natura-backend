import { NotFoundException } from '@nestjs/common';

export class CartNotFound extends NotFoundException {
  constructor() {
    super('Cart not found.');
  }
}
