import Stripe from 'stripe';
import { Module } from '@nestjs/common';
import type { RouteTree } from '@nestjs/core';

import { ProductsModule } from 'api/v1/products/products.module';
import { CategoriesModule } from 'api/v1/categories/categories.module';
import { V1Profile } from 'api/v1/v1.profile';
import { PaymentsModule } from 'api/v1/payments/payments.module';
import { StripeMethod } from 'database/models/paymentMethods/stripeMethod.entity';
import { CodMethod } from 'database/models/paymentMethods/codMethod.entity';
import { CartsModule } from 'api/v1/carts/carts.module';
import { WebhooksModule } from 'api/v1/webhooks/webhooks.module';

@Module({
  imports: [
    CategoriesModule,
    PaymentsModule,
    ProductsModule,
    CartsModule,
    WebhooksModule,
  ],
  providers: [V1Profile, Stripe, StripeMethod, CodMethod],
})
export class V1Module {}

export const v1Routes: RouteTree = {
  path: 'api/v1',
  module: V1Module,
  children: [
    ProductsModule,
    CategoriesModule,
    PaymentsModule,
    CartsModule,
    WebhooksModule,
  ],
};
