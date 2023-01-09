import Stripe from 'stripe';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { RouteTree } from '@nestjs/core';

import { ProductsModule } from 'api/v1/products/products.module';
import { CategoriesModule } from 'api/v1/categories/categories.module';
import { V1Profile } from 'api/v1/v1.profile';
import { Order } from 'database/models/order.entity';
import { OrderDetail } from 'database/models/orderDetail.entity';
import { PaymentMethod } from 'database/models/paymentMethod.entity';
import { PaymentOrder } from 'database/models/paymentOrder.entity';
import { OrdersModule } from 'api/v1/orders/orders.module';
import { PaymentsModule } from 'api/v1/paymentOrders/payments.module';
import { WebhooksController } from 'api/v1/webhook.controller';
import { StripeService } from 'api/services/StripeService';
import { CreateOrderService } from 'api/v1/orders/services/CreateOrderService';
import { CreateOrderDetailService } from 'api/v1/orders/services/CreateOrderDetailService';
import { StripeMethod } from 'database/models/paymentMethods/stripe.entity';
import { CreatePaymentOrderService } from 'api/v1/paymentOrders/services/CreatePaymentOrderService';
import { OCDMethod } from 'database/models/paymentMethods/ocd.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderDetail,
      PaymentMethod,
      PaymentOrder,
      StripeMethod,
      OCDMethod,
    ]),
    CategoriesModule,
    PaymentsModule,
    OrdersModule,
  ],
  controllers: [WebhooksController],
  providers: [
    V1Profile,
    Stripe,
    String,
    StripeService,
    CreateOrderDetailService,
    CreatePaymentOrderService,
    CreateOrderService,
    StripeMethod,
    OCDMethod,
  ],
})
export class V1Module {}

export const v1Routes: RouteTree = {
  path: 'api/v1',
  module: V1Module,
  children: [ProductsModule, CategoriesModule, OrdersModule, PaymentsModule],
};
