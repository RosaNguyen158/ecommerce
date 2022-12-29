import { InjectRepository } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import type { Repository } from 'typeorm';

import { Variant } from 'database/models/variant.entity';
import { CreateVariantDetailService } from 'api/admin/productVariants/variants/services/CreateVariantDetailService';
import type { IVariantParams } from 'api/admin/productVariants/variants/variant.interface';

export class CreateVariantService {
  constructor(
    @InjectRepository(Variant)
    private variantRepository: Repository<Variant>,
    private createVariantDetailService: CreateVariantDetailService,
  ) {}

  public async exec({
    quantity,
    price,
    productId,
    listOptions,
  }: IVariantParams): Promise<Variant> {
    const newVariant = this.variantRepository.create({
      quantity,
      price,
      productId,
    });

    try {
      await this.variantRepository.save(newVariant);

      listOptions.map(async (paramsOption) => {
        const { optionId, valueOption } = paramsOption;
        console.log('optionId', optionId);

        await this.createVariantDetailService.exec({
          variantId: newVariant.id,
          optionId,
          valueOption,
        });
      });

      return newVariant;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
