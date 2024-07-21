import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { config } from '@app/config/config';
import { DocumentationService } from '@infra/http/documentation/documentation.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const documentationService = new DocumentationService({
    appVersion: config.APP_VERSION,
  });

  await documentationService.start(app, 'api/docs');

  await app.listen(config.APP_PORT);
}
bootstrap();
