import { NotFoundException } from '@nestjs/common';

export class ProductNotFound extends NotFoundException {
  constructor() {
    super('Product not found.');
  }
}
