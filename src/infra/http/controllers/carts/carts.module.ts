import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { CreateCart } from '@app/use-cases/carts/create-cart';
import { DeleteCart } from '@app/use-cases/carts/delete-cart';
import { GetCartById } from '@app/use-cases/carts/get-cart-by-id';
import { UpdateCartItems } from '@app/use-cases/carts/update-cart-items';

import { CreateCartController } from './create-cart.controller';
import { DeleteCartController } from './delete-cart.controller';
import { GetCartByIdController } from './get-cart-by-id.controller';
import { UpdateCartItemsController } from './update-cart-items.controller';

@Module({
  controllers: [
    CreateCartController,
    GetCartByIdController,
    UpdateCartItemsController,
    DeleteCartController,
  ],
  providers: [CreateCart, GetCartById, UpdateCartItems, DeleteCart],
})
export class CartsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer;
  }
}
