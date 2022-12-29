import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from 'api/admin/guard/roles.decorator';
import { Option } from 'database/models/option.entity';
import { RolesGuard } from 'api/admin/guard/roles.guard';
import { CreateOptionService } from 'api/admin/productVariants/options/services/CreateOptionService';
import { CreateOptionDto } from 'api/admin/productVariants/options/options.dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
@Controller('options')
export class OptionsController {
  constructor(private readonly createOptionService: CreateOptionService) {}

  @Post()
  public async create(
    @Body() createOptionDto: CreateOptionDto,
  ): Promise<Option> {
    return this.createOptionService.exec(createOptionDto);
  }
}
