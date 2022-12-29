import type { OptionDto } from 'api/admin/products/products.dto';

export interface IVariantParams {
  productId: string;
  price: number;
  quantity: number;
  listOptions: OptionDto[];
}

export interface IVariantDetailParams {
  optionId: string;
  variantId: string;
  valueOption: string;
}
