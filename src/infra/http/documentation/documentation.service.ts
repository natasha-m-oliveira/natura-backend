import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export type DocumentationProps = {
  appVersion: string;
};

export class DocumentationService {
  constructor(data: DocumentationProps) {
    this.data = data;
    this.config = this.createConfig();
  }

  private data: DocumentationProps;

  private config: Omit<OpenAPIObject, 'paths'>;

  private createConfig(): Omit<OpenAPIObject, 'paths'> {
    const config = new DocumentBuilder()
      .setTitle('Natura &co API Documentation')
      .setVersion(this.data.appVersion)
      .addTag('Carts')
      .addTag('Products')
      .addTag('Files')
      .build();

    return config;
  }

  async start(app: INestApplication, path: string) {
    const document = SwaggerModule.createDocument(app, this.config);

    SwaggerModule.setup(path, app, document);
  }
}
