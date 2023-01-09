import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}

export class CreateProCateDto {
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  slug: string;
}
