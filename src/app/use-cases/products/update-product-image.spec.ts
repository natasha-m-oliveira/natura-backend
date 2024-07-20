import { Product } from '@app/entities/product';
import { LocalStorageProvider } from '@infra/providers/storage/local-storage-provider';
import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';

import { ProductNotFound } from './errors/product-not-found';
import { UpdateProductImage } from './update-product-image';

describe('Update Product Image', () => {
  const now = new Date();
  const nextDay = new Date(now);
  nextDay.setDate(now.getDate() + 1);

  const image = {
    filename: 'self.jpg',
    originalname: 'self.jpg',
    mimetype: 'image/jpeg',
    buffer: Buffer.from(''),
    encoding: '7bit',
    fieldname: 'file',
    size: 252193,
  };

  let productsRepository: InMemoryProductsRepository;
  let storageProvider: LocalStorageProvider;
  let updateProductImage: UpdateProductImage;

  beforeEach(async () => {
    productsRepository = new InMemoryProductsRepository();
    storageProvider = new LocalStorageProvider();

    updateProductImage = new UpdateProductImage(
      productsRepository,
      storageProvider,
    );
  });

  it("should be able to update a product's image", async () => {
    const product = new Product({
      name: 'OunVu',
      price: 38666,
    });

    await productsRepository.create(product);

    await updateProductImage.execute({
      id: product.id,
      file: image,
    });

    expect(productsRepository.products[0].image).not.toBeNull();
  });

  it("should not be able to update a non-existent product's image", async () => {
    expect(
      updateProductImage.execute({
        id: 'ada79b58-b6c9-57aa-83b8-0a0819dad512',
        file: image,
      }),
    ).rejects.toBeInstanceOf(ProductNotFound);
  });
});
