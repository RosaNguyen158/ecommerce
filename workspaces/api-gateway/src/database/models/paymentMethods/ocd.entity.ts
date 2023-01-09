import { InjectRepository } from '@nestjs/typeorm';
import { ChildEntity } from 'typeorm';
import type { Repository } from 'typeorm';

import { CreateOrderService } from 'api/v1/orders/services/CreateOrderService';
import { CreatePaymentOrderService } from 'api/v1/paymentOrders/services/CreatePaymentOrderService';
import { PaymentMethod } from 'database/models/paymentMethod.entity';
import type { IPaymentMethodParams } from 'api/services/StripeService/interface';

@ChildEntity()
export class OCDMethod extends PaymentMethod {
  constructor(
    @InjectRepository(OCDMethod)
    private ocdRepository: Repository<OCDMethod>,
    protected createOrderService: CreateOrderService,
    protected createPaymentOrderService: CreatePaymentOrderService,
  ) {
    super(createOrderService, createPaymentOrderService);
  }

  protected async createPaymentMethod({
    metadata,
    name,
  }: IPaymentMethodParams): Promise<OCDMethod> {
    const payment = this.ocdRepository.create({
      name,
      metadata,
    });

    return this.ocdRepository.save(payment);
  }
}
