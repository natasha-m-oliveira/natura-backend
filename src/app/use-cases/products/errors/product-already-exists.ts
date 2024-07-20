import { BadRequestException } from '@nestjs/common';

export class ProductAlreadyExists extends BadRequestException {
  constructor() {
    super('Product already exists.');
  }
}
