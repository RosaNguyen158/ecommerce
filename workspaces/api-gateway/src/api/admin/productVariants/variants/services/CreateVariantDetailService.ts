import { InjectRepository } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import type { Repository } from 'typeorm';

import { VariantDetail } from 'database/models/variantDetail.entity';
import type { IVariantDetailParams } from 'api/admin/productVariants/variants/variant.interface';

export class CreateVariantDetailService {
  constructor(
    @InjectRepository(VariantDetail)
    private variantDetailRepository: Repository<VariantDetail>,
  ) {}

  public async exec(params: IVariantDetailParams): Promise<VariantDetail> {
    const newVariantDetail = this.variantDetailRepository.create(params);

    try {
      await this.variantDetailRepository.save(newVariantDetail);
      console.log(newVariantDetail);

      return newVariantDetail;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
