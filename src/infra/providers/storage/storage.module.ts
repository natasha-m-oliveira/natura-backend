import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { config } from '@app/config/config';
import { StorageProvider } from '@app/providers/storage-provider';

import { MulterStorageProvider } from './multer-storage-provider';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: config.DB_URL_MONGO,
      }),
    }),
  ],
  providers: [
    {
      provide: StorageProvider,
      useClass: MulterStorageProvider,
    },
  ],
  exports: [StorageProvider],
})
export class StorageModule {}
