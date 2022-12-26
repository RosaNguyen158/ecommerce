import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { MapInterceptor } from '@automapper/nestjs';

import { PagyDto } from 'dto';
import {
  ProductsPagyMetadataV1VM,
  ProductsPagyV1VM,
} from 'api/v1/products/product.v1.vm';
import { GetListProductsV1Service } from 'api/v1/products/services/GetListProductsV1Service';

@Controller('products')
export class ProductsV1Controller {
  constructor(
    private readonly getListProductsV1Service: GetListProductsV1Service,
  ) {}

  @Get()
  @UseInterceptors(MapInterceptor(ProductsPagyMetadataV1VM, ProductsPagyV1VM))
  public async getList(
    @Query() queryParams: PagyDto,
  ): Promise<ProductsPagyMetadataV1VM> {
    const [data, total] = await this.getListProductsV1Service.exec(queryParams);
    return {
      data,
      total,
    };
  }
}
