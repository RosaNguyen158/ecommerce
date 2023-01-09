import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CartDto {
  @IsString()
  userId: string;
}

export class ProductCartDto {
  @IsString()
  productId: string;

  @Transform(({ value }) => parseInt(value, 10))
  quantity: number;
}
