import {
  Controller,
  InternalServerErrorException,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import type { Request } from 'express';

import { Payment } from 'database/models/payment.entity';
import { stripe } from 'database/models/paymentMethods/stripeMethod.entity';
import { convertByOption, pick } from 'utils';
import type { IMetadataParams } from 'api/v1/payments/payments.interface';
import type { IStripeDataObject } from 'api/v1/webhooks/webhook.interfaces';

@Controller('webhook')
export class WebhooksController {
  private stripe: Stripe;
  private endpointSecret: string;

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {
    this.stripe = stripe;
    this.endpointSecret = process.env.SECRET_ENDPOINT_STRIPE;
  }

  @Post('/stripe')
  public async createCheckoutStripe(
    @Req() request: RawBodyRequest<Request>,
  ): Promise<Stripe.Event> {
    const payload = request.rawBody;
    const sig = request.headers['stripe-signature'];
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        sig,
        this.endpointSecret,
      );
    } catch (err) {
      throw new InternalServerErrorException(err);
    }

    const session = convertByOption<IStripeDataObject>(
      'camelCase',
      event.data.object,
    );

    switch (event.type) {
      case 'charge.succeeded': {
        const metadata: IMetadataParams = {
          email: session.billingDetails.email,
          ...pick(session.paymentMethodDetails.card, [
            'brand',
            'country',
            'expMonth',
            'expYear',
            'last4',
          ]),
        };

        await this.paymentRepository.update(
          { id: session.metadata.paymentId },
          { metadata },
        );
        break;
      }

      case 'checkout.session.completed': {
        if (session.paymentStatus === 'paid') {
          await this.paymentRepository.update(
            { id: session.metadata.paymentId },
            { status: 'paid' },
          );
        }
        break;
      }

      case 'checkout.session.async_payment_failed': {
        await this.paymentRepository.update(
          { id: session.metadata.paymentId },
          { status: 'failed' },
        );
        break;
      }
    }

    return event;
  }
}
