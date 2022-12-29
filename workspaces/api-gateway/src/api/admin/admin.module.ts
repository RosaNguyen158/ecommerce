import { Module } from '@nestjs/common';
import type { RouteTree } from '@nestjs/core';

import { AdminProfile } from 'api/admin/admin.profile';
import { CategoriesModule } from 'api/admin/categories/categories.module';
import { ProductsModule } from 'api/admin/products/products.module';
import { OptionsModule } from 'api/admin/productVariants/options/options.module';
import { VariantsModule } from 'api/admin/productVariants/variants/variants.module';

@Module({
  imports: [CategoriesModule, ProductsModule, OptionsModule, VariantsModule],
  providers: [AdminProfile],
})
export class AdminModule {}

export const adminRoutes: RouteTree = {
  path: 'admin',
  module: AdminModule,
  children: [CategoriesModule, ProductsModule, OptionsModule],
};
