import { CartItem } from './cart-item';

export type CartStatus = 'pending' | 'ordered';

type CartProps = {
  id?: string;
  status?: CartStatus;
  createdAt?: Date;
  updatedAt?: Date;

  items: CartItem[];
};

export class Cart {
  private props: Required<CartProps>;

  constructor(props: CartProps) {
    this.props = {
      id: props.id ?? '',
      status: props.status ?? 'pending',
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),

      items: props.items,
    };
  }

  public get id() {
    return this.props.id;
  }

  public set id(id: string) {
    this.props.id = id;
  }

  public get status() {
    return this.props.status;
  }

  public set status(status: CartStatus) {
    this.props.status = status;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  public get items() {
    return this.props.items;
  }

  public set items(items: CartItem[]) {
    this.props.items = items;
  }
}
