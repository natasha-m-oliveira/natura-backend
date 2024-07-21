import {
  ApiBodyOptions,
  ApiParamOptions,
  ApiPropertyOptions,
  ApiQueryOptions,
  ApiResponseOptions,
  ApiOperationOptions,
} from '@nestjs/swagger';

export type DocumentationEndpoint = {
  name: string;
  operation?: ApiOperationOptions;
  body?: ApiBodyOptions;
  response?: ApiResponseOptions;
};

export type DocumentationDto = {
  name: string;
  properties: ApiPropertyOptions[];
};

export type DocumentationConfig = {
  params?: ApiParamOptions[];
  query?: ApiQueryOptions[];
  endpoints?: DocumentationEndpoint[];
  dtos?: DocumentationDto[];
};
