import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreatePaymentDto {
  listCartDetailIds: string[];

  method: string;
}

export class ProductPaymentDto {
  @IsString()
  productId: string;

  @Transform(({ value }) => parseFloat(value))
  unitPrice: number;

  @Transform(({ value }) => parseInt(value, 10))
  quantity: number;
}
