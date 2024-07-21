import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

import { Item } from './item';

export class UpdateCartItemsBody {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Item)
  items: Item[];
}
