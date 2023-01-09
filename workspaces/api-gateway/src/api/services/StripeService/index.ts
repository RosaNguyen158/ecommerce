import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { PaymentOrder } from 'database/models/paymentOrder.entity';
import { StripeMethod } from 'database/models/paymentMethods/stripe.entity';
import type {
  IMetadataParams,
  IPaymentParams,
  IProductOrderParams,
} from 'api/services/StripeService/interface';
import type { CreateOrderDto } from 'api/v1/orders/orders.dto';

export class StripeService {
  constructor(
    @InjectRepository(PaymentOrder)
    private paymenOrderRepository: Repository<PaymentOrder>,
    private stripeMethod: StripeMethod,
    private stripe: Stripe,
  ) {
    this.stripe = new Stripe(process.env.SECRET_KEY_STRIPE, {
      apiVersion: '2022-11-15',
    });
  }

  public async createSession({
    userId,
    listProducts,
  }: CreateOrderDto): Promise<string> {
    const line_items = listProducts.reduce((acc, item) => {
      const itemStripe = {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.productId,
          },
          unit_amount: item.unitPrice,
        },
        quantity: item.quantity,
      };
      return [...acc, itemStripe];
    }, []);

    const session = await this.stripe.checkout.sessions.create({
      metadata: { userId },
      line_items,
      mode: 'payment',
      success_url:
        'https://dashboard.stripe.com/test/payments?status[0]=successful',
      cancel_url:
        'https://dashboard.stripe.com/test/payments?status[0]=refunded&status[1]=refund_pending&status[2]=partially_refunded',
    });
    return session.url;
  }

  public async checkoutStripe(event: Stripe.Event): Promise<PaymentOrder> {
    let resultPayment: PaymentOrder;
    let userId: string;
    let listProducts: IProductOrderParams[];

    const events = await this.stripe.events.list();

    if (event['data']['object']['object'] == 'checkout.session') {
      userId = event['data']['object']['metadata']['userId'];
    }

    const getCharge = events.data.find(
      ({ type }) => type === 'charge.succeeded',
    );
    const getMetadataCard: IMetadataParams = {
      brandCard:
        getCharge.data.object['payment_method_details']['card']['brand'],
      country:
        getCharge.data.object['payment_method_details']['card']['country'],
      exp_month:
        getCharge.data.object['payment_method_details']['card']['exp_month'],
      exp_year:
        getCharge.data.object['payment_method_details']['card']['exp_year'],
      last4: getCharge.data.object['payment_method_details']['card']['last4'],
    };

    if (event['data']['object']['object'] == 'checkout.session') {
      const idCheckout = event['data']['object']['id'];
      const lineItemGroup = await this.stripe.checkout.sessions.listLineItems(
        idCheckout,
      );

      listProducts = lineItemGroup.data.reduce((acc, item) => {
        const productOrder: IProductOrderParams = {
          productId: item.description,
          unitPrice: item.price.unit_amount,
          quantity: item.quantity,
        };
        return [...acc, productOrder];
      }, []);
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;

        const paymentParams: IPaymentParams = {
          name: 'stripe',
          metadata: getMetadataCard,
          userId,
          listProducts,
          amount: event.data.object['amount_total'],
          email: event.data.object['customer_details']['email'],
        };

        resultPayment = await this.stripeMethod.checkout(paymentParams);

        if (session['payment_status'] === 'paid') {
          await this.paymenOrderRepository.update(
            { orderId: resultPayment.orderId },
            { status: 'paid' },
          );
        }
        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        await this.paymenOrderRepository.update(
          { orderId: resultPayment.orderId },
          { status: 'paid' },
        );

        break;
      }

      case 'checkout.session.async_payment_failed': {
        await this.paymenOrderRepository.update(
          { orderId: resultPayment.orderId },
          { status: 'failed' },
        );
        break;
      }
    }

    return resultPayment;
  }
}
