import { Stripe } from 'stripe';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PaymentOrder } from 'database/models/paymentOrder.entity';
import type { Repository } from 'typeorm';

export interface IPaymentStripe {
  orderId: string;
  methodId: string;
  total: number;
}

@Injectable()
export class ConfirmStripeCheckoutService {
  constructor(
    @InjectRepository(PaymentOrder)
    private paymenOrderRepository: Repository<PaymentOrder>,
    private stripe: Stripe,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  public async exec({ orderId }: IPaymentStripe): Promise<PaymentOrder> {
    await this.stripe.paymentIntents.confirm('pi_3MLNxCHBiY9n7vwT1l5IpSVw', {
      payment_method: 'pm_card_visa',
    });

    const confirmPayment = await this.paymenOrderRepository
      .update(
        { orderId },
        {
          status: 'paid',
        },
      )
      .then((response) => {
        return response.raw[0];
      });

    return confirmPayment;
  }
}
