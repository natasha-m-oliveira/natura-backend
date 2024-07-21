import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { DownloadFile } from '@app/use-cases/files/download-file';

import { DownloadFileController } from './download-file-controller';

@Module({
  controllers: [DownloadFileController],
  providers: [DownloadFile],
})
export class FilesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer;
  }
}
