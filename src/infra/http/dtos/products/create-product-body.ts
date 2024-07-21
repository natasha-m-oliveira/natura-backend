import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

import { IsLessThanNumber } from '@infra/http/validators/is-less-than-number.decorator';

export class CreateProductBody {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  description?: string | null;

  @IsNotEmpty()
  @IsInt()
  @Min(99)
  price: number;

  @IsOptional()
  @IsInt()
  @Min(99)
  @IsLessThanNumber('price')
  discount?: number;
}
