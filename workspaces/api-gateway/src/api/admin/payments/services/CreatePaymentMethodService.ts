import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { PaymentMethod } from 'database/models/paymentMethod.entity';
import type { CreatePaymentMethodDto } from 'api/admin/payments/paymentMethod.dto';

@Injectable()
export class CreatePaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  public async exec(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const newMethod = this.paymentMethodRepository.create(
      createPaymentMethodDto,
    );

    try {
      return this.paymentMethodRepository.save(newMethod);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
