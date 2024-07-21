import { DocumentationConfig } from './types';
import { getFromArray } from './utils/get-from-array';

export class DocumentationApi {
  constructor(config: DocumentationConfig) {
    this.config = config;
  }

  config: DocumentationConfig;

  getDtoProperty(dtoName: string, propertyName: string) {
    const dto = getFromArray(this.config.dtos, 'name', dtoName);

    return getFromArray(dto.properties, 'name', propertyName);
  }

  getEndpoint(name: string) {
    return getFromArray(this.config.endpoints, 'name', name);
  }

  getParam(name: string) {
    return getFromArray(this.config.params, 'name', name);
  }

  getQueryParam(name: string) {
    return getFromArray(this.config.query, 'name', name);
  }
}
