import { IsInt, IsNotEmpty, IsUUID, Max, Min } from 'class-validator';

export class Item {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(10)
  quantity: number;
}
