import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { createSlug } from 'utils';
import { Product } from 'database/models/product.entity';
import { CheckProductExistedService } from 'api/admin/products/services/CheckProductExistedService';
import { CreateProductCategoryService } from 'api/admin/products/services/CreateProductCategoryService';
import { GetCategoryByKeyService } from 'api/admin/categories/services/GetCategoryByKeyService';
import { CreateVariantService } from 'api/admin/productVariants/variants/services/CreateVariantService';
import type { CreateProductDto } from 'api/admin/products/products.dto';

@Injectable()
export class CreateProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private checkProductExistedService: CheckProductExistedService,
    private createProductCategoryService: CreateProductCategoryService,
    private getCategoryByKeyService: GetCategoryByKeyService,
    private createVariantService: CreateVariantService,
  ) {}

  public async exec({
    categoryId,
    name,
    variants,
  }: CreateProductDto): Promise<Product> {
    const checkCategory = await this.getCategoryByKeyService.exec(categoryId);

    const newProduct = this.productRepository.create({
      name,
      category: checkCategory,
      slug: await createSlug(
        {
          name: name,
          columnName: 'slug',
        },
        this.checkProductExistedService.exec.bind(
          this.checkProductExistedService,
        ),
      ),
    });

    try {
      await this.productRepository.save(newProduct);
      await this.createProductCategoryService.exec({
        categoryId: checkCategory.id,
        productId: newProduct.id,
      });

      if (variants) {
        variants.map(async (params) => {
          const { price, quantity, listOptions } = params;
          await this.createVariantService.exec({
            productId: newProduct.id,
            price,
            quantity,
            listOptions,
          });
        });
      }

      return newProduct;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
