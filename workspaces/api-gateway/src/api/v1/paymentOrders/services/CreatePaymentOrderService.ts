import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { PaymentOrder } from 'database/models/paymentOrder.entity';
import type { IPaymentParams } from 'api/services/StripeService/interface';

@Injectable()
export class CreatePaymentOrderService {
  constructor(
    @InjectRepository(PaymentOrder)
    private paymenOrderRepository: Repository<PaymentOrder>,
  ) {}

  public async exec(params: IPaymentParams): Promise<PaymentOrder> {
    const newPaymentOrder = this.paymenOrderRepository.create(params);

    try {
      return this.paymenOrderRepository.save(newPaymentOrder);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
