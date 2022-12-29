import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Option } from 'database/models/option.entity';
import { OptionsController } from 'api/admin/productVariants/options/options.controller';
import { CreateOptionService } from 'api/admin/productVariants/options/services/CreateOptionService';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  providers: [CreateOptionService],
  controllers: [OptionsController],
})
export class OptionsModule {}
