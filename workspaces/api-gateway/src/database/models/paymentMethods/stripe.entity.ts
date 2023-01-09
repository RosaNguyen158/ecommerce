import { ChildEntity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { PaymentMethod } from 'database/models/paymentMethod.entity';
import { CreateOrderService } from 'api/v1/orders/services/CreateOrderService';
import { CreatePaymentOrderService } from 'api/v1/paymentOrders/services/CreatePaymentOrderService';
import type { IPaymentMethodParams } from 'api/services/StripeService/interface';

@ChildEntity()
export class StripeMethod extends PaymentMethod {
  @AutoMap()
  @Column()
  email: string;

  constructor(
    @InjectRepository(StripeMethod)
    private stripeRepository: Repository<StripeMethod>,
    protected createOrderService: CreateOrderService,
    protected createPaymentOrderService: CreatePaymentOrderService,
  ) {
    super(createOrderService, createPaymentOrderService);
  }

  protected async createPaymentMethod({
    metadata,
    name,
    email,
  }: IPaymentMethodParams): Promise<StripeMethod> {
    const payment = this.stripeRepository.create({
      name,
      metadata,
      email,
    });

    return this.stripeRepository.save(payment);
  }
}
