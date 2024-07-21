import { randomUUID } from 'node:crypto';

import { createDefaultQuerys } from '@infra/http/documentation/base-documentation';
import { DocumentationApi } from '@infra/http/documentation/documentation-api';
import { DocumentationConfig } from '@infra/http/documentation/types';

const documentationConfig: DocumentationConfig = {
  params: [
    {
      name: 'id',
      description: 'UUID of the selected cart',
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
      name: 'create-cart',
      body: {
        required: true,
        schema: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: {
                    type: 'string',
                    format: 'uuid',
                  },
                  quantity: {
                    type: 'number',
                  },
                },
              },
            },
          },
          example: {
            items: [
              {
                productId: randomUUID(),
                quantity: 1,
              },
            ],
          },
        },
      },
      response: {
        description: 'Responds with the created cart object.',
        status: 201,
      },
    },
    {
      name: 'delete-cart',
      response: {
        description: 'No content',
        status: 204,
      },
    },
    {
      name: 'update-cart-items',
      body: {
        required: true,
        schema: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: {
                    type: 'string',
                    format: 'uuid',
                  },
                  quantity: {
                    type: 'number',
                  },
                },
              },
            },
          },
          example: {
            items: [
              {
                productId: randomUUID(),
                quantity: 1,
              },
            ],
          },
        },
      },
      response: {
        description: 'Responds with the updated cart object.',
        status: 200,
      },
    },
    {
      name: 'get-cart-by-id',
      response: {
        description: 'Responds with the cart object selected by id.',
        status: 200,
      },
    },
  ],
};

export const documentation = new DocumentationApi(documentationConfig);
