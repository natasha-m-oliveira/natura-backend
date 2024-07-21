import { Product } from '@app/entities/product';
import { ProductsRepository } from '@app/repositories/products-repository';
import { QueryOptions } from '@app/repositories/types';

export class InMemoryProductsRepository extends ProductsRepository {
  public readonly products: Product[] = [];

  async create(product: Product): Promise<void> {
    this.products.push(product);
  }

  async findByName(name: string): Promise<Product | null> {
    const product = this.products.find((product) => product.name === name);

    if (!product) return null;

    return product;
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);

    if (!product) return null;

    return product;
  }

  private filterBySearch(products: Product[], search: string): Product[] {
    const lowerCaseSearch = search.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseSearch) ||
        product.description.toLowerCase().includes(lowerCaseSearch),
    );
  }

  private paginate(
    products: Product[],
    page: { offset?: number; limit?: number },
  ): Product[] {
    const { offset = 0, limit } = page;

    if (!limit) return this.products.slice(offset);

    return products.slice(offset, offset + limit);
  }

  async list(options: QueryOptions): Promise<Product[]> {
    let products = this.products;

    if (options.search)
      products = this.filterBySearch(products, options.search);

    if (options.page) products = this.paginate(products, options.page);

    return products;
  }

  async save(product: Product): Promise<void> {
    const index = this.products.findIndex(({ id }) => id === product.id);

    this.products.splice(index, 1, product);
  }

  async deleteById(id: string): Promise<void> {
    const index = this.products.findIndex((product) => product.id === id);

    this.products.splice(index, 1);
  }
}
