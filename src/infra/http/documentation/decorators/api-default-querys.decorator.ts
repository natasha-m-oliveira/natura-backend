import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { DocumentationApi } from '../documentation-api';

export function ApiDefaultQuerys(documentation: DocumentationApi) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    if (String(target.constructor.name).startsWith('List'))
      return applyDecorators(
        ApiQuery(documentation.getQueryParam('page[offset]')),
        ApiQuery(documentation.getQueryParam('page[limit]')),
        ApiQuery(documentation.getQueryParam('search')),
      ).apply(this, [target, propertyKey, descriptor]);

    return;
  };
}
