import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from 'api/admin/guard/roles.decorator';
import { RolesGuard } from 'api/admin/guard/roles.guard';
import { CreatePaymentMethodDto } from 'api/admin/payments/paymentMethod.dto';
import { CreatePaymentMethodService } from 'api/admin/payments/services/CreatePaymentMethodService';
import { PaymentMethod } from 'database/models/paymentMethod.entity';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
@Controller('paymentMethods')
export class PaymentMethodsController {
  constructor(
    private readonly createPaymentMethodService: CreatePaymentMethodService,
  ) {}

  @Post()
  public async createCategory(
    @Body() createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return this.createPaymentMethodService.exec(createPaymentMethodDto);
  }
}
