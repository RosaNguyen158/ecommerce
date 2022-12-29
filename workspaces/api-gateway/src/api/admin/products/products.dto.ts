import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  variants?: VariantDto[];
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

export class VariantDto {
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @Transform(({ value }) => parseInt(value, 10))
  quantity: number;

  listOptions: OptionDto[];
}

export class OptionDto {
  @IsString()
  optionId: string;

  @IsNotEmpty()
  valueOption: string;
}
