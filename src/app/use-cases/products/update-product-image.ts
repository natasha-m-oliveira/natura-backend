import { Injectable } from '@nestjs/common';

import { File } from '@app/helpers/file';
import { StorageProvider } from '@app/providers/storage-provider';
import { ProductsRepository } from '@app/repositories/products-repository';

import { ProductNotFound } from './errors/product-not-found';

type UpdateProductImageRequest = {
  id: string;
  file?: File;
};

type UpdateProductImageResponse = void;

@Injectable()
export class UpdateProductImage {
  constructor(
    private productsRepository: ProductsRepository,
    private storageProvider: StorageProvider,
  ) {}

  async execute(
    props: UpdateProductImageRequest,
  ): Promise<UpdateProductImageResponse> {
    const product = await this.productsRepository.findById(props.id);

    if (!product) throw new ProductNotFound();

    if (product.image)
      await this.storageProvider.delete(product.image, 'product');

    const url = props.file
      ? await this.storageProvider.save(props.file, 'product')
      : null;

    product.image = url;

    await this.productsRepository.save(product);
  }
}
