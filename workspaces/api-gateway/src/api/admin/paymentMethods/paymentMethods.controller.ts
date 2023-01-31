import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { Roles } from 'api/admin/guard/roles.decorator';
import { RolesGuard } from 'api/admin/guard/roles.guard';
import { PaymentMethod } from 'database/models/paymentMethod.entity';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
@Controller('paymentMethods')
export class PaymentMethodsController {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  @Get('all')
  public async getAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.find();
  }
}
