import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import Stripe from 'stripe';
import type { Request } from 'express';

import { StripeService } from 'api/services/StripeService';
import { CreateOrderDto } from 'api/v1/orders/orders.dto';
import { PaymentOrder } from 'database/models/paymentOrder.entity';
import { OCDMethod } from 'database/models/paymentMethods/ocd.entity';
import type { IPaymentParams } from 'api/services/StripeService/interface';

@Controller('checkout')
export class WebhooksController {
  constructor(
    private stripe: Stripe,
    private endpointSecret: string,
    private ocdMethod: OCDMethod,
    private stripeService: StripeService,
  ) {
    this.stripe = new Stripe(process.env.SECRET_KEY_STRIPE, {
      apiVersion: '2022-11-15',
    });
    this.endpointSecret = process.env.SECRET_ENDPOINT_STRIPE;
  }

  @Post('/create-checkout-session')
  public async createCheckoutSession(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<string> {
    return this.stripeService.createSession(createOrderDto);
  }

  @Post('/stripe')
  public async createCheckoutStripe(
    @Req() request: RawBodyRequest<Request>,
  ): Promise<PaymentOrder> {
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

    return this.stripeService.checkoutStripe(event);
  }

  @Post('/ocd')
  public async createCheckoutOcd(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<PaymentOrder> {
    const amount = createOrderDto.listProducts.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );

    const paymentParams: IPaymentParams = {
      name: 'ocd',
      amount,
      userId: createOrderDto.userId,
      listProducts: createOrderDto.listProducts,
    };

    return this.ocdMethod.checkout(paymentParams);
  }
}
