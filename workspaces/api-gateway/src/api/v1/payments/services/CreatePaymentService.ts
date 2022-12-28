import { Stripe } from 'stripe';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PaymentOrder } from 'database/models/paymentOrder.entity';
import type { Repository } from 'typeorm';

export interface IPaymentStripe {
  orderId: string;
  methodId: string;
  total: number;
}

// export abstract class Checkout {
//   constructor(
//     @InjectRepository(PaymentMethod)
//     private paymentMethodRepository: Repository<PaymentMethod>,
//   ) {}

//   abstract checkout(): any;
// }

@Injectable()
export class CreateStripeCheckoutService {
  constructor(
    @InjectRepository(PaymentOrder)
    private paymenOrderRepository: Repository<PaymentOrder>,
    private stripe: Stripe,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  public async exec({
    orderId,
    methodId,
    total,
  }: IPaymentStripe): Promise<PaymentOrder> {
    const newPaymentIntent = await this.stripe.paymentIntents.create({
      amount: +total * 100,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: { orderId },
    });

    console.log(newPaymentIntent);

    const newPaymentOrder = this.paymenOrderRepository.create({
      orderId,
      status: 'unpaid',
      amount: total,
      methodId,
    });

    try {
      return this.paymenOrderRepository.save(newPaymentOrder);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
