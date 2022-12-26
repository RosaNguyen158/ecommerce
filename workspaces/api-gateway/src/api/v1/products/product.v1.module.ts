import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from 'database/models/product.entity';
import { ProductsV1Controller } from 'api/v1/products/product.v1.controller';
import { GetListProductsV1Service } from 'api/v1/products/services/GetListProductsV1Service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [GetListProductsV1Service],
  controllers: [ProductsV1Controller],
})
export class ProductsV1Module {}
