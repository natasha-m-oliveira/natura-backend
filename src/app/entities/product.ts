type ProductProps = {
  id?: string;
  name: string;
  description?: string | null;
  image?: string | null;
  price: number;
  discount?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Product {
  private props: Required<ProductProps>;

  constructor(props: ProductProps) {
    this.props = {
      id: props.id ?? '',
      name: props.name,
      description: props.description ?? null,
      image: props.image ?? null,
      price: props.price,
      discount: props.discount ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id() {
    return this.props.id;
  }

  public set id(id: string) {
    this.props.id = id;
  }

  public get name() {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get description() {
    return this.props.description;
  }

  public set description(description: string | null) {
    this.props.description = description;
  }

  public get image() {
    return this.props.image;
  }

  public set image(image: string | null) {
    this.props.image = image;
  }

  public get price() {
    return this.props.price;
  }

  public set price(price: number) {
    this.props.price = price;
  }

  public get discount() {
    return this.props.discount;
  }

  public set discount(discount: number | null) {
    this.props.discount = discount;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}
