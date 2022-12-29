import { InjectRepository } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import type { Repository } from 'typeorm';

import { Option } from 'database/models/option.entity';
import type { CreateCategoryDto } from 'api/admin/categories/categories.dto';

export class CreateOptionService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}

  public async exec({ name }: CreateCategoryDto): Promise<Option> {
    const newOption = this.optionRepository.create({
      name,
    });

    try {
      return this.optionRepository.save(newOption);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
