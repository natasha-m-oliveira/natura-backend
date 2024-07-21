import { randomUUID } from 'node:crypto';

type CartItemProps = {
  id?: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt?: Date;
};

export class CartItem {
  private props: Required<CartItemProps>;

  constructor(props: CartItemProps) {
    this.props = {
      id: props.id ?? randomUUID(),
      cartId: props.cartId,
      productId: props.productId,
      quantity: props.quantity,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this.props.id;
  }

  public set id(id: string) {
    this.props.id = id;
  }

  public get cartId() {
    return this.props.cartId;
  }

  public set cartId(cartId: string) {
    this.props.cartId = cartId;
  }

  public get productId() {
    return this.props.productId;
  }

  public set productId(productId: string) {
    this.props.productId = productId;
  }

  public get quantity() {
    return this.props.quantity;
  }

  public set quantity(quantity: number) {
    this.props.quantity = quantity;
  }

  public get createdAt() {
    return this.props.createdAt;
  }
}
