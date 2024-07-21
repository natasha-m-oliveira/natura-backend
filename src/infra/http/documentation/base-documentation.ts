import { ApiQueryOptions } from '@nestjs/swagger';

export function createDefaultQuerys(): ApiQueryOptions[] {
  return [
    {
      name: 'page[offset]',
      description:
        'The number of items to skip before starting to collect the result set.',
      schema: {
        type: 'number',
        minimum: 0,
        nullable: true,
      },
      example: 0,
      required: false,
    },
    {
      name: 'page[limit]',
      description: 'The number of items to return.',
      schema: {
        type: 'number',
        minimum: 1,
        nullable: true,
      },
      example: 10,
      required: false,
    },
    {
      name: 'search',
      description: 'The search term that will be used to find items',
      schema: {
        type: 'string',
        nullable: true,
      },
      example: 'teste',
      required: false,
    },
  ];
}
