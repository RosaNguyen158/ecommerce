import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  userId: string;

  paymentMethodId: string;

  listProducts: ProductOrderDto[];
}

export class ProductOrderDto {
  @IsString()
  productId: string;

  @Transform(({ value }) => parseFloat(value))
  unitPrice: number;

  @Transform(({ value }) => parseInt(value, 10))
  quantity: number;
}

export class GetOrderDto {
  id?: string;
  userId?: string;
}
