import Stripe from 'stripe';
import { ChildEntity } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { PaymentMethod } from 'database/models/paymentMethod.entity';
import { convertByOption } from 'utils';
import type { TKeysToCamelCase } from 'utils';
import type { ICheckoutParams } from 'api/v1/payments/payments.interface';
import type { ICheckoutResults } from 'api/v1/payments/payments.controller';

export const stripe = new Stripe(process.env.SECRET_KEY_STRIPE, {
  apiVersion: '2022-11-15',
});

@ChildEntity()
export class StripeMethod extends PaymentMethod {
  public async checkout({
    userId,
    listCartDetails,
    paymentId,
  }: ICheckoutParams): Promise<ICheckoutResults> {
    try {
      const lineItems = listCartDetails.reduce((acc, item) => {
        const itemStripe: TKeysToCamelCase<Stripe.Checkout.SessionCreateParams.LineItem> =
          {
            priceData: {
              currency: 'usd',
              productData: {
                name: item.productId,
              },
              unitAmount: item.product.price,
            },
            quantity: item.quantity,
          };

        return [...acc, itemStripe];
      }, []);

      const createCheckoutSession: TKeysToCamelCase<Stripe.Checkout.SessionCreateParams> =
        {
          metadata: { userId, paymentId },
          paymentIntentData: { metadata: { paymentId } },
          lineItems,
          mode: 'payment',
          successUrl:
            'https://dashboard.stripe.com/test/payments?status[0]=successful',
          cancelUrl:
            'https://dashboard.stripe.com/test/payments?status[0]=refunded&status[1]=refund_pending&status[2]=partially_refunded',
        };

      const session = await stripe.checkout.sessions.create(
        convertByOption<Stripe.Checkout.SessionCreateParams>(
          'snakeCase',
          createCheckoutSession,
        ),
      );

      return { url: session.url };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
