import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from 'database/models/product.entity';
import { Category } from 'database/models/category.entity';
import { ProductsCategories } from 'database/models/productsCategories.entity';
import { ProductsController } from 'api/admin/products/products.controller';
import { GetListProductsService } from 'api/admin/products/services/GetListProductsService';
import { CreateProductService } from 'api/admin/products/services/CreateProductService';
import { UpdateProductService } from 'api/admin/products/services/UpdateProductService';
import { CheckProductExistedService } from 'api/admin/products/services/CheckProductExistedService';
import { CreateProductCategoryService } from 'api/admin/products/services/CreateProductCategoryService';
import { GetCategoryByKeyService } from 'api/admin/categories/services/GetCategoryByKeyService';
import { GetRelatedCategoriesService } from 'api/admin/categories/services/GetRelatedCategoriesService';
import { DeleteProductService } from 'api/admin/products/services/DeleteProductService';
import { Variant } from 'database/models/variant.entity';
import { CreateVariantService } from 'api/admin/productVariants/variants/services/CreateVariantService';
import { CreateVariantDetailService } from 'api/admin/productVariants/variants/services/CreateVariantDetailService';
import { VariantDetail } from 'database/models/variantDetail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductsCategories,
      Category,
      Variant,
      VariantDetail,
    ]),
  ],
  providers: [
    CreateProductService,
    GetListProductsService,
    UpdateProductService,
    CheckProductExistedService,
    CreateProductCategoryService,
    GetCategoryByKeyService,
    GetRelatedCategoriesService,
    DeleteProductService,
    CreateVariantService,
    CreateVariantDetailService,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
