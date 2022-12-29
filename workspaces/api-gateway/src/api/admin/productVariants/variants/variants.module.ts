import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VariantDetail } from 'database/models/variantDetail.entity';
import { Variant } from 'database/models/variant.entity';
import { CreateVariantService } from 'api/admin/productVariants/variants/services/CreateVariantService';
import { CreateVariantDetailService } from 'api/admin/productVariants/variants/services/CreateVariantDetailService';

@Module({
  imports: [TypeOrmModule.forFeature([Variant, VariantDetail])],
  providers: [CreateVariantService, CreateVariantDetailService],
})
export class VariantsModule {}
