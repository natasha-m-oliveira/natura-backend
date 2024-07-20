import { Product } from '../entities/product';
import { QueryOptions } from './types';

export abstract class ProductsRepository {
  abstract create(product: Product): Promise<void>;
  abstract findById(id: string): Promise<Product | null>;
  abstract findByName(name: string): Promise<Product | null>;
  abstract list(options?: QueryOptions): Promise<Product[]>;
  abstract save(product: Product): Promise<void>;
  abstract deleteById(id: string): Promise<void>;
}
