import { Injectable } from '@nestjs/common';

import { Cart } from '@app/entities/cart';
import { CartsRepository } from '@app/repositories/carts-repository';

import { PrismaCartMapper } from '../mappers/prisma-cart-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCartsRepository extends CartsRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(cart: Cart): Promise<void> {
    await this.prisma.cart.create({
      data: PrismaCartMapper.toCreate(cart).data,
    });
  }

  async findById(id: string): Promise<Cart | null> {
    const cart = await this.prisma.cart.findUnique({
      where: {
        id,
      },
    });

    if (!cart) return null;

    return PrismaCartMapper.toDomain(cart);
  }

  async save(cart: Cart): Promise<void> {
    await this.prisma.cart.update({
      data: PrismaCartMapper.toUpdate(cart).data,
      where: {
        id: cart.id,
      },
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.cart.delete({
      where: {
        id,
      },
    });
  }
}
