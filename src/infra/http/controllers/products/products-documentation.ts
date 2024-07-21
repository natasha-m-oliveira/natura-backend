import { randomUUID } from 'node:crypto';

import { createDefaultQuerys } from '@infra/http/documentation/base-documentation';
import { DocumentationApi } from '@infra/http/documentation/documentation-api';
import { DocumentationConfig } from '@infra/http/documentation/types';

const documentationConfig: DocumentationConfig = {
  params: [
    {
      name: 'id',
      description: 'UUID of the selected product',
      schema: {
        type: 'string',
        format: 'uuid',
      },
      example: randomUUID(),
      required: true,
    },
  ],
  query: createDefaultQuerys(),
  endpoints: [
    {
      name: 'create-product',
      body: {
        required: true,
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            price: {
              type: 'number',
            },
            discount: {
              type: 'number',
            },
          },
          example: {
            name: 'Essencial Masculino 100ml',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet sagittis nunc. Vivamus facilisis mi in lectus dapibus, vel volutpat libero ornare. Nulla facilisi.',
            price: 18999,
            discount: 1000,
          },
        },
      },
      response: {
        description: 'Responds with the created product object.',
        status: 201,
      },
    },
    {
      name: 'delete-product',
      response: {
        description: 'No content',
        status: 204,
      },
    },
    {
      name: 'update-product-image',
      operation: {
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  file: {
                    type: 'string',
                    format: 'binary',
                  },
                },
              },
            },
          },
        },
      },
      response: {
        description: 'No content',
        status: 204,
      },
    },
    {
      name: 'get-product-by-id',
      response: {
        description: 'Responds with the product object selected by id.',
        status: 200,
      },
    },
    {
      name: 'list-products',
      response: {
        description: 'Responds with all registered products.',
        status: 200,
      },
    },
  ],
};

export const documentation = new DocumentationApi(documentationConfig);
